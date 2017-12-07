import * as request from 'request';
import * as events from 'events';
import config from '../config/';
import { read } from 'fs';

export default class Monitor extends events.EventEmitter implements IMonitor {
  public website: string;
  public method: string;
  public interval: number;
  
  private timer: number;

  constructor(opts: IMonitorOpts) {
    super();
    this.method = opts.method || config.settings.method;
    this.website = opts.website || config.settings.website;
    this.interval = opts.interval || config.settings.checkInterval;

    this.interval = this.interval * 60 * 1000; // min

    this.start();
  }

  private start() {
    if (!this.website) {
      this.emit('error', '不是有效的网址!');
      return;
    }

    this.ping();

    this.timer = setInterval(this.ping.bind(this), this.interval);
  }

  public stop() {
    clearInterval(this.timer);
    this.timer = null;

    this.emit('stop', this.website);
  }

  private ping() {
    const self = this;
    let currentTime = Date.now();
    let options = {
      url: this.website,
      method: this.method
    };

    request(options, (err, res, body) => {
      let latency = Date.now() - currentTime;

      if (!err) {
        if (res.statusCode === 200) {
          this.emit('ok', {
            website: this.website,
            latency
          });
        } else {
          this.emit('down', {
            website: this.website,
            code: res.statusCode,
            message: res.statusMessage
          });
        }

      } else {
        this.emit('err', err);
      }
    });
  }

  public pingOnce(): Promise<IMonitorPingOnce|Error> {
    return new Promise((resolve, reject) => {
      const self = this;
      let currentTime = Date.now();
      let options = {
        url: this.website,
        method: this.method
      };
  
      request(options, (err, res, body) => {
        let latency = Date.now() - currentTime;
  
        if (!err) {
          if (res.statusCode === 200) {
            resolve({
              website: this.website,
              latency
            });
          } else {
            resolve({
              website: this.website,
              code: res.statusCode,
              message: res.statusMessage
            });
          }
        } else {
          reject(err);
        }
      });
    });
    
  }

}