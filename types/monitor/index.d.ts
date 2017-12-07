interface IMonitor {
  ping();
  stop();
}

interface IMonitorOpts {
  method?: string;
  website: string;
  interval?: number;
}

interface IMonitorOk {
  website: string;
  latency: number;
}

interface IMonitorDown {
  website: string;
  code: number;
  message: string
}