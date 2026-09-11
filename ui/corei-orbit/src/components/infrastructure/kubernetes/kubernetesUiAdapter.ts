/**
 * COREI Kubernetes UI Adapter
 *
 * PURPOSE
 * -------
 * Converts authoritative Kubernetes API objects into the display fields
 * expected by the existing COREI Orbit Kubernetes UI.
 *
 * ARCHITECTURAL BOUNDARY
 * ----------------------
 * UI-only transformation.
 * Does NOT modify the Kubernetes backend.
 * Does NOT mutate the source objects.
 * Preserves the complete original object under `_raw`.
 */

type K8sObject = Record<string, any>;

const metadata = (obj: K8sObject) =>
  obj?.metadata && typeof obj.metadata === 'object' ? obj.metadata : {};

const spec = (obj: K8sObject) =>
  obj?.spec && typeof obj.spec === 'object' ? obj.spec : {};

const status = (obj: K8sObject) =>
  obj?.status && typeof obj.status === 'object' ? obj.status : {};

const nameOf = (obj: K8sObject) =>
  obj?.name ?? metadata(obj).name ?? '';

const namespaceOf = (obj: K8sObject) =>
  obj?.namespace ?? metadata(obj).namespace ?? '';

const ageOf = (obj: K8sObject) => {
  const timestamp = obj?.creationTimestamp ?? metadata(obj).creationTimestamp;
  if (!timestamp) return '—';

  const created = new Date(timestamp).getTime();
  if (!Number.isFinite(created)) return String(timestamp);

  const seconds = Math.max(0, Math.floor((Date.now() - created) / 1000));

  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
};



const containerStatuses = (obj: K8sObject): any[] =>
  Array.isArray(status(obj).containerStatuses)
    ? status(obj).containerStatuses
    : [];

const readyContainers = (obj: K8sObject): number =>
  containerStatuses(obj).filter((container) => container?.ready === true).length;

const restartCount = (obj: K8sObject): number =>
  containerStatuses(obj).reduce(
    (total, container) => total + Number(container?.restartCount || 0),
    0
  );



export function normalizeNode(obj: K8sObject): K8sObject {
  const labels =
    obj?.labels && typeof obj.labels === 'object'
      ? obj.labels
      : {};

  const nodeInfo =
    obj?.nodeInfo && typeof obj.nodeInfo === 'object'
      ? obj.nodeInfo
      : {};

  const capacity =
    obj?.capacity && typeof obj.capacity === 'object'
      ? obj.capacity
      : {};

  const allocatable =
    obj?.allocatable && typeof obj.allocatable === 'object'
      ? obj.allocatable
      : {};

  const conditions = Array.isArray(obj?.conditions)
    ? obj.conditions
    : [];

  const addresses = Array.isArray(obj?.addresses)
    ? obj.addresses
    : [];

  const internalAddress =
    addresses.find(
      (address: any) => address?.type === 'InternalIP'
    )?.address ?? '—';

  const readyCondition = conditions.find(
    (condition: any) => condition?.type === 'Ready'
  );

  const ready =
    readyCondition?.status === 'True';

  const roleLabels = Object.keys(labels)
    .filter((key) =>
      key.startsWith('node-role.kubernetes.io/')
    )
    .map((key) =>
      key.split('/')[1] || 'worker'
    );

  const role =
    roleLabels.length > 0
      ? roleLabels.join(', ')
      : 'worker';

  const status =
    obj?.unschedulable === true
      ? 'SchedulingDisabled'
      : ready
        ? 'Ready'
        : 'NotReady';

  return {
    ...obj,

    name: obj?.name ?? metadata(obj).name ?? '',
    namespace: obj?.namespace ?? metadata(obj).namespace ?? '',

    role,
    status,

    internal_ip: internalAddress,

    version:
      obj?.version ??
      nodeInfo.kubeletVersion ??
      '—',

    cpu_usage:
      obj?.cpu_usage ??
      '—',

    memory_usage:
      obj?.memory_usage ??
      '—',

    age: ageOf(obj),

    capacity,
    allocatable,

    cpu_capacity: capacity.cpu ?? '—',
    cpu_allocatable: allocatable.cpu ?? '—',

    memory_capacity: capacity.memory ?? '—',
    memory_allocatable: allocatable.memory ?? '—',

    pod_capacity: capacity.pods ?? '—',
    pod_allocatable: allocatable.pods ?? '—',

    conditions,
    taints: Array.isArray(obj?.taints)
      ? obj.taints
      : [],

    unschedulable:
      obj?.unschedulable ?? false,

    os_image:
      nodeInfo.osImage ?? '—',

    kernel_version:
      nodeInfo.kernelVersion ?? '—',

    container_runtime:
      nodeInfo.containerRuntimeVersion ?? '—',

    kubelet_version:
      nodeInfo.kubeletVersion ?? '—',

    kube_proxy_version:
      nodeInfo.kubeProxyVersion ?? '—',

    architecture:
      nodeInfo.architecture ?? '—',

    operating_system:
      nodeInfo.operatingSystem ?? '—',

    machine_id:
      nodeInfo.machineID ?? '—',

    boot_id:
      nodeInfo.bootID ?? '—',

    system_uuid:
      nodeInfo.systemUUID ?? '—',

    addresses,
    labels,

    _raw: obj,
  };
}

export function normalizePod(obj: K8sObject): K8sObject {
  const containers = Array.isArray(spec(obj).containers)
    ? spec(obj).containers
    : [];

  const totalContainers = containers.length;
  const ready = readyContainers(obj);

  return {
    ...obj,
    name: nameOf(obj),
    namespace: namespaceOf(obj),
    status: obj.status?.status ?? status(obj).phase ?? 'Unknown',
    ready: `${ready}/${totalContainers}`,
    restarts: restartCount(obj),
    age: ageOf(obj),
    node: obj.node ?? spec(obj).nodeName ?? '—',
    ip: obj.ip ?? status(obj).podIP ?? '—',
    cpu_usage: obj.cpu_usage ?? '—',
    memory_usage: obj.memory_usage ?? '—',
    containers: totalContainers,
    pod_ip: status(obj).podIP ?? '—',
    host_ip: status(obj).hostIP ?? '—',
    qos_class: status(obj).qosClass ?? '—',
    service_account:
      spec(obj).serviceAccountName ??
      spec(obj).serviceAccount ??
      '—',
    restart_policy: spec(obj).restartPolicy ?? '—',
    node_selector: spec(obj).nodeSelector ?? {},
    conditions: status(obj).conditions ?? [],
    container_statuses: containerStatuses(obj),

    _raw: obj,
  };
}

export function normalizeDeployment(obj: K8sObject): K8sObject {
  const deploymentStatus = status(obj);
  const deploymentSpec = spec(obj);

  return {
    ...obj,
    name: nameOf(obj),
    namespace: namespaceOf(obj),
    replicas:
      obj.replicas ??
      deploymentStatus.replicas ??
      deploymentSpec.replicas ??
      0,
    ready:
      obj.ready ??
      deploymentStatus.readyReplicas ??
      0,
    available:
      obj.available ??
      deploymentStatus.availableReplicas ??
      0,
    updated:
      obj.updated ??
      deploymentStatus.updatedReplicas ??
      0,
    strategy:
      obj.strategy ??
      deploymentSpec.strategy?.type ??
      '—',
    revision:
      obj.revision ??
      metadata(obj).annotations?.['deployment.kubernetes.io/revision'] ??
      '—',
    age: ageOf(obj),

    observed_generation: deploymentStatus.observedGeneration ?? '—',
    unavailable: deploymentStatus.unavailableReplicas ?? 0,
    conditions: deploymentStatus.conditions ?? [],
    selector: deploymentSpec.selector ?? {},
    template: deploymentSpec.template ?? {},

    _raw: obj,
  };
}

export function normalizeStatefulSet(obj: K8sObject): K8sObject {
  const s = status(obj);
  const sp = spec(obj);

  return {
    ...obj,
    name: nameOf(obj),
    namespace: namespaceOf(obj),
    replicas: s.replicas ?? sp.replicas ?? 0,
    ready: s.readyReplicas ?? 0,
    current: s.currentReplicas ?? 0,
    updated: s.updatedReplicas ?? 0,
    age: ageOf(obj),
    update_strategy: sp.updateStrategy?.type ?? '—',
    service_name: sp.serviceName ?? '—',
    _raw: obj,
  };
}

export function normalizeDaemonSet(obj: K8sObject): K8sObject {
  const s = status(obj);

  return {
    ...obj,
    name: nameOf(obj),
    namespace: namespaceOf(obj),
    desired: s.desiredNumberScheduled ?? 0,
    current: s.currentNumberScheduled ?? 0,
    ready: s.numberReady ?? 0,
    available: s.numberAvailable ?? 0,
    updated: s.updatedNumberScheduled ?? 0,
    age: ageOf(obj),
    _raw: obj,
  };
}

export function normalizeJob(obj: K8sObject): K8sObject {
  const s = status(obj);
  const sp = spec(obj);

  return {
    ...obj,
    name: nameOf(obj),
    namespace: namespaceOf(obj),
    completions: s.succeeded ?? 0,
    succeeded: s.succeeded ?? 0,
    failed: s.failed ?? 0,
    active: s.active ?? 0,
    parallelism: sp.parallelism ?? '—',
    age: ageOf(obj),
    _raw: obj,
  };
}

export function normalizeCronJob(obj: K8sObject): K8sObject {
  const sp = spec(obj);
  const s = status(obj);

  return {
    ...obj,
    name: nameOf(obj),
    namespace: namespaceOf(obj),
    schedule: sp.schedule ?? '—',
    suspend: sp.suspend ?? false,
    active: Array.isArray(s.active) ? s.active.length : 0,
    last_schedule:
      s.lastScheduleTime ??
      '—',
    age: ageOf(obj),
    _raw: obj,
  };
}

export function normalizeService(obj: K8sObject): K8sObject {
  const sp = spec(obj);

  return {
    ...obj,
    name: nameOf(obj),
    namespace: namespaceOf(obj),
    type: sp.type ?? obj.type ?? '—',
    clusterIP: sp.clusterIP ?? obj.clusterIP ?? '—',
    externalIP:
      obj.externalIP ??
      (Array.isArray(sp.externalIPs) ? sp.externalIPs.join(', ') : '—'),
    ports: Array.isArray(sp.ports)
      ? sp.ports.map((port: any) =>
          `${port.port ?? '—'}:${port.targetPort ?? '—'}/${port.protocol ?? 'TCP'}`
        ).join(', ')
      : '—',
    selector: sp.selector ?? {},
    session_affinity: sp.sessionAffinity ?? '—',
    internal_traffic_policy: sp.internalTrafficPolicy ?? '—',
    _raw: obj,
  };
}

export function normalizeEndpoint(obj: K8sObject): K8sObject {
  return {
    ...obj,
    name: nameOf(obj),
    namespace: namespaceOf(obj),
    subsets: obj.subsets ?? status(obj).subsets ?? [],
    addresses: obj.addresses ?? [],
    ports: obj.ports ?? [],
    _raw: obj,
  };
}

export function normalizeIngress(obj: K8sObject): K8sObject {
  const sp = spec(obj);

  return {
    ...obj,
    name: nameOf(obj),
    namespace: namespaceOf(obj),
    ingressClass:
      sp.ingressClassName ??
      obj.ingressClass ??
      '—',
    hosts: Array.isArray(sp.rules)
      ? sp.rules.map((rule: any) => rule.host).filter(Boolean).join(', ')
      : '—',
    rules: sp.rules ?? [],
    tls: sp.tls ?? [],
    load_balancer: status(obj).loadBalancer ?? {},
    _raw: obj,
  };
}

export function normalizeNetworkPolicy(obj: K8sObject): K8sObject {
  const sp = spec(obj);

  return {
    ...obj,
    name: nameOf(obj),
    namespace: namespaceOf(obj),
    podSelector: sp.podSelector ?? {},
    policyTypes: sp.policyTypes ?? [],
    ingress: sp.ingress ?? [],
    egress: sp.egress ?? [],
    _raw: obj,
  };
}

export function normalizePV(obj: K8sObject): K8sObject {
  const sp = spec(obj);
  const s = status(obj);

  return {
    ...obj,
    name: nameOf(obj),
    status: s.phase ?? obj.status ?? '—',
    capacity: sp.capacity?.storage ?? obj.capacity ?? '—',
    accessModes: Array.isArray(sp.accessModes)
      ? sp.accessModes.join(', ')
      : '—',
    storageClass:
      sp.storageClassName ??
      obj.storageClass ??
      '—',
    reclaimPolicy: sp.persistentVolumeReclaimPolicy ?? '—',
    volumeMode: sp.volumeMode ?? '—',
    claimRef: sp.claimRef ?? {},
    age: ageOf(obj),
    _raw: obj,
  };
}

export function normalizePVC(obj: K8sObject): K8sObject {
  const sp = spec(obj);
  const s = status(obj);

  return {
    ...obj,
    name: nameOf(obj),
    namespace: namespaceOf(obj),
    status: s.phase ?? obj.status ?? '—',
    volume:
      sp.volumeName ??
      obj.volume ??
      '—',
    capacity:
      s.capacity?.storage ??
      obj.capacity ??
      '—',
    accessModes: Array.isArray(s.accessModes)
      ? s.accessModes.join(', ')
      : Array.isArray(sp.accessModes)
        ? sp.accessModes.join(', ')
        : '—',
    storageClass:
      sp.storageClassName ??
      obj.storageClass ??
      '—',
    volumeMode: sp.volumeMode ?? '—',
    _raw: obj,
  };
}

export function normalizeStorageClass(obj: K8sObject): K8sObject {
  const sp = spec(obj);

  return {
    ...obj,
    name: nameOf(obj),
    provisioner: obj.provisioner ?? sp.provisioner ?? '—',
    reclaimPolicy:
      sp.reclaimPolicy ??
      obj.reclaimPolicy ??
      '—',
    volumeBindingMode:
      sp.volumeBindingMode ??
      obj.volumeBindingMode ??
      '—',
    allowVolumeExpansion:
      sp.allowVolumeExpansion ??
      obj.allowVolumeExpansion ??
      false,
    mountOptions: sp.mountOptions ?? [],
    parameters: sp.parameters ?? {},
    _raw: obj,
  };
}

export function normalizeConfigMap(obj: K8sObject): K8sObject {
  const data = obj.data ?? {};
  return {
    ...obj,
    name: nameOf(obj),
    namespace: namespaceOf(obj),
    keys: Object.keys(data).length,
    data,
    immutable: obj.immutable ?? false,
    _raw: obj,
  };
}

export function normalizeSecret(obj: K8sObject): K8sObject {
  const data = obj.data ?? {};
  return {
    ...obj,
    name: nameOf(obj),
    namespace: namespaceOf(obj),
    type: obj.type ?? 'Opaque',
    keys: Object.keys(data).length,
    data_count: Object.keys(data).length,
    _raw: obj,
  };
}

export function normalizeServiceAccount(obj: K8sObject): K8sObject {
  return {
    ...obj,
    name: nameOf(obj),
    namespace: namespaceOf(obj),
    secrets: Array.isArray(obj.secrets) ? obj.secrets.length : 0,
    image_pull_secrets: Array.isArray(obj.imagePullSecrets)
      ? obj.imagePullSecrets.length
      : 0,
    _raw: obj,
  };
}

export function normalizeRBAC(obj: K8sObject): K8sObject {
  return {
    ...obj,
    name: nameOf(obj),
    namespace: namespaceOf(obj),
    rules_count: Array.isArray(obj.rules) ? obj.rules.length : 0,
    subjects_count: Array.isArray(obj.subjects) ? obj.subjects.length : 0,
    roleRef_name: obj.roleRef?.name ?? '—',
    roleRef_kind: obj.roleRef?.kind ?? '—',
    roleRef_apiGroup: obj.roleRef?.apiGroup ?? '—',
    rules: obj.rules ?? [],
    subjects: obj.subjects ?? [],
    roleRef: obj.roleRef ?? {},
    _raw: obj,
  };
}

export function normalizeEvent(obj: K8sObject): K8sObject {
  return {
    ...obj,
    name: nameOf(obj),
    namespace: namespaceOf(obj),
    reason: obj.reason ?? '—',
    message: obj.message ?? '—',
    type: obj.type ?? '—',
    involved_kind: obj.involvedObject?.kind ?? '—',
    involved_name: obj.involvedObject?.name ?? '—',
    source:
      obj.source?.component ??
      obj.reportingComponent ??
      '—',
    count: obj.count ?? 1,
    age:
      obj.lastTimestamp ??
      obj.eventTime ??
      obj.firstTimestamp ??
      '—',
    _raw: obj,
  };
}

export function normalizeCollection(
  value: unknown,
  normalizer: (obj: K8sObject) => K8sObject
): K8sObject[] {
  if (!Array.isArray(value)) return [];

  return value.map((item) =>
    item && typeof item === 'object'
      ? normalizer(item as K8sObject)
      : item
  );
}

export const kubernetesUiAdapter = {
  nodes: (value: unknown) => normalizeCollection(value, normalizeNode),
  pods: (value: unknown) => normalizeCollection(value, normalizePod),
  deployments: (value: unknown) => normalizeCollection(value, normalizeDeployment),
  statefulsets: (value: unknown) => normalizeCollection(value, normalizeStatefulSet),
  daemonsets: (value: unknown) => normalizeCollection(value, normalizeDaemonSet),
  jobs: (value: unknown) => normalizeCollection(value, normalizeJob),
  cronjobs: (value: unknown) => normalizeCollection(value, normalizeCronJob),
  services: (value: unknown) => normalizeCollection(value, normalizeService),
  endpoints: (value: unknown) => normalizeCollection(value, normalizeEndpoint),
  ingresses: (value: unknown) => normalizeCollection(value, normalizeIngress),
  networkpolicies: (value: unknown) => normalizeCollection(value, normalizeNetworkPolicy),
  persistentvolumes: (value: unknown) => normalizeCollection(value, normalizePV),
  persistentvolumeclaims: (value: unknown) => normalizeCollection(value, normalizePVC),
  storageclasses: (value: unknown) => normalizeCollection(value, normalizeStorageClass),
  configmaps: (value: unknown) => normalizeCollection(value, normalizeConfigMap),
  secrets: (value: unknown) => normalizeCollection(value, normalizeSecret),
  serviceaccounts: (value: unknown) => normalizeCollection(value, normalizeServiceAccount),
  roles: (value: unknown) => normalizeCollection(value, normalizeRBAC),
  rolebindings: (value: unknown) => normalizeCollection(value, normalizeRBAC),
  clusterroles: (value: unknown) => normalizeCollection(value, normalizeRBAC),
  clusterrolebindings: (value: unknown) => normalizeCollection(value, normalizeRBAC),
  events: (value: unknown) => normalizeCollection(value, normalizeEvent),
};
