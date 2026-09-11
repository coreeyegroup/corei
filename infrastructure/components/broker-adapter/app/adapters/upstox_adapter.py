import os
import time
import requests
from typing import Dict, Any, Optional, List
from app.adapters.base_adapter import BaseBrokerAdapter
from app.models.broker_health import BrokerHealth
from app.models.simulated_fill import SimulatedFill

class UpstoxAdapter(BaseBrokerAdapter):
    """
    Upstox broker adapter using OAuth 2.0.
    Credentials are injected via environment variables.
    """

    def __init__(self):
        self.client_id = os.getenv("UPSTOX_CLIENT_ID")
        self.client_secret = os.getenv("UPSTOX_CLIENT_SECRET")
        self.redirect_uri = os.getenv("UPSTOX_REDIRECT_URI", "http://localhost:8003/oauth/callback")
        self.access_token = None
        self.refresh_token = None
        self.token_expiry = 0
        self.base_url = "https://api.upstox.com/v2"
        self.connected = False
        self.user_profile = None

    def _ensure_token(self):
        """Refresh token if expired or missing."""
        if self.access_token and time.time() < self.token_expiry:
            return
        # In a production system, you would use refresh_token here.
        # For simplicity, we raise an exception to force re-authentication.
        raise Exception("Access token missing or expired. Please re-authenticate.")

    def connect(self, auth_code: Optional[str] = None) -> Dict[str, Any]:
        """
        Exchange authorization code for access token.
        If auth_code is None, return the authorization URL for frontend redirect.
        """
        if auth_code:
            url = "https://api.upstox.com/v2/login/authorization/token"
            payload = {
                "code": auth_code,
                "client_id": self.client_id,
                "client_secret": self.client_secret,
                "redirect_uri": self.redirect_uri,
                "grant_type": "authorization_code"
            }
            resp = requests.post(url, data=payload, timeout=10)
            if resp.status_code != 200:
                raise Exception(f"Token exchange failed: {resp.text}")
            data = resp.json()
            self.access_token = data["access_token"]
            self.refresh_token = data.get("refresh_token")
            self.token_expiry = time.time() + data["expires_in"]
            self.connected = True
            # Fetch user profile to confirm connection
            self._fetch_profile()
            return {"status": "connected", "message": "Authentication successful", "profile": self.user_profile}
        else:
            auth_url = (
                f"https://api.upstox.com/v2/login/authorization/dialog"
                f"?client_id={self.client_id}&redirect_uri={self.redirect_uri}"
                f"&response_type=code"
            )
            return {"auth_url": auth_url}

    def _fetch_profile(self):
        """Retrieve user profile to confirm token validity."""
        self._ensure_token()
        headers = {"Authorization": f"Bearer {self.access_token}"}
        resp = requests.get(f"{self.base_url}/user/profile", headers=headers, timeout=5)
        if resp.status_code == 200:
            self.user_profile = resp.json()
        else:
            raise Exception(f"Failed to fetch profile: {resp.text}")

    def health(self) -> BrokerHealth:
        if not self.connected:
            return BrokerHealth(broker="upstox", connected=False, latency_ms=0, heartbeat_timestamp_ns=0)
        try:
            start = time.time()
            self._ensure_token()
            headers = {"Authorization": f"Bearer {self.access_token}"}
            resp = requests.get(f"{self.base_url}/user/profile", headers=headers, timeout=3)
            latency = int((time.time() - start) * 1000)
            connected = resp.status_code == 200
        except Exception:
            connected = False
            latency = 0
        return BrokerHealth(
            broker="upstox",
            connected=connected,
            latency_ms=latency,
            heartbeat_timestamp_ns=int(time.time() * 1e9)
        )

    def funds(self) -> Dict[str, Any]:
        """Get available funds/margin."""
        self._ensure_token()
        headers = {"Authorization": f"Bearer {self.access_token}"}
        resp = requests.get(f"{self.base_url}/user/get-funds-and-margin", headers=headers, timeout=5)
        if resp.status_code != 200:
            raise Exception(f"Failed to fetch funds: {resp.text}")
        return resp.json()

    def positions(self) -> List[Dict[str, Any]]:
        """Get current positions."""
        self._ensure_token()
        headers = {"Authorization": f"Bearer {self.access_token}"}
        resp = requests.get(f"{self.base_url}/portfolio/short-term-positions", headers=headers, timeout=5)
        if resp.status_code != 200:
            raise Exception(f"Failed to fetch positions: {resp.text}")
        return resp.json().get("data", [])

    def holdings(self) -> List[Dict[str, Any]]:
        """Get long-term holdings."""
        self._ensure_token()
        headers = {"Authorization": f"Bearer {self.access_token}"}
        resp = requests.get(f"{self.base_url}/portfolio/long-term-holdings", headers=headers, timeout=5)
        if resp.status_code != 200:
            raise Exception(f"Failed to fetch holdings: {resp.text}")
        return resp.json().get("data", [])

    def orders(self) -> List[Dict[str, Any]]:
        """Get all orders."""
        self._ensure_token()
        headers = {"Authorization": f"Bearer {self.access_token}"}
        resp = requests.get(f"{self.base_url}/order/retrieve-all", headers=headers, timeout=5)
        if resp.status_code != 200:
            raise Exception(f"Failed to fetch orders: {resp.text}")
        return resp.json().get("data", [])

    def dispatch_order(self, order: Dict[str, Any]) -> Dict[str, Any]:
        """Place an order via Upstox API."""
        self._ensure_token()
        headers = {"Authorization": f"Bearer {self.access_token}", "Content-Type": "application/json"}
        # Map generic order to Upstox format
        payload = {
            "quantity": order["quantity"],
            "product": order.get("product", "D"),
            "validity": order.get("validity", "DAY"),
            "price": order.get("price", 0),
            "tag": order.get("tag", "COREI"),
            "instrument_token": order["instrument_token"],
            "order_type": order.get("order_type", "LIMIT"),
            "transaction_type": order.get("side", "BUY"),
            "disclosed_quantity": order.get("disclosed_quantity", 0),
            "trigger_price": order.get("trigger_price", 0),
        }
        resp = requests.post(f"{self.base_url}/order/place", json=payload, headers=headers, timeout=10)
        if resp.status_code != 200:
            raise Exception(f"Order placement failed: {resp.text}")
        return resp.json()

    def cancel_order(self, order_id: str) -> Dict[str, Any]:
        """Cancel an existing order."""
        self._ensure_token()
        headers = {"Authorization": f"Bearer {self.access_token}"}
        resp = requests.delete(f"{self.base_url}/order/cancel/{order_id}", headers=headers, timeout=10)
        if resp.status_code != 200:
            raise Exception(f"Order cancellation failed: {resp.text}")
        return resp.json()

    def status(self) -> Dict[str, Any]:
        """Return current connection state."""
        return {
            "connected": self.connected,
            "broker": "upstox",
            "token_valid": self.access_token is not None and time.time() < self.token_expiry,
            "profile": self.user_profile,
            "expires_in": int(self.token_expiry - time.time()) if self.token_expiry else 0,
        }

    def simulate_fill(self, order: Dict[str, Any]) -> SimulatedFill:
        # Not used for live broker; keep as mock fallback.
        from app.adapters.mock_adapter import MockBrokerAdapter
        return MockBrokerAdapter().simulate_fill(order)
