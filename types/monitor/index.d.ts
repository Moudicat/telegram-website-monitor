interface IMonitor {
  website: string;
  interval: number;
  method: string;
  isRunning: boolean;

  pingOnce();
  start();
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

interface IMonitorPingOnce {
  website: string;
  code?: number;
  message?: string;
  latency?: number;
}