"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const events = require("events");
const _1 = require("../config/");
class Monitor extends events.EventEmitter {
    constructor(opts) {
        super();
        this.method = opts.method || _1.default.settings.method;
        this.website = opts.website || _1.default.settings.website;
        this.interval = opts.interval || _1.default.settings.checkInterval;
        this.interval = this.interval * 60 * 1000; // min
        this.start();
    }
    start() {
        if (!this.website) {
            this.emit('error', 'No website to monitor');
            return;
        }
        this.ping();
        this.timer = setInterval(this.ping.bind(this), this.interval);
    }
    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.emit('stop', this.website);
    }
    ping() {
        const self = this;
        let currentTime = Date.now();
        let options = {
            url: this.website,
            method: this.method
        };
        request(options, (err, res, body) => {
            let latency = Date.now() - currentTime;
            if (!err && res.statusCode === 200) {
                this.emit('ok', {
                    website: this.website,
                    latency
                });
            }
            else {
                this.emit('down', { err, res });
            }
        });
    }
}
exports.default = Monitor;
//# sourceMappingURL=index.js.map