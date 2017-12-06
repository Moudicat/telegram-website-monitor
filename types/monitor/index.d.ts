interface IMonitor {
  ping();
}

interface IMonitorOpts {
  method?: string;
  website: string;
  interval?: number;
}