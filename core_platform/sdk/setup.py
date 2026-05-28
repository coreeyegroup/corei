from setuptools import find_packages, setup

setup(
    name="trading-platform-sdk",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "httpx==0.27.0",
        "pydantic==2.8.2",
        "aiokafka==0.10.0",
        "confluent-kafka==2.5.3"
    ],
)
