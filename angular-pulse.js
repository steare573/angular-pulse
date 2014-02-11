/**
 * Factory fo
 * Created by steare on 2/10/14.
 */
angular.module('aio.services.angular-pulse', [])

  .factory('pulse', function ($rootScope) {

    function Pulse(opts) {

      var options = opts || {};
      this.prevTs = null;
      this.curTs = null;
      this.timeDiffThreshold = options.timeDiffThreshold || 1000;
      this.pulseEventName = options.pulseEventName || 'deviceResurrected';


    }


  Pulse.prototype.checkPulse = function ( callback ) {

      this.prevDt = this.prevDt || new Date();
      this.curDt = new Date();

      var timeDiff = this.curDt.getTime() - this.prevDt.getTime();

      this.prevDt = this.curDt;

      var res = {
        resurrected: timeDiff > this.timeDiffThreshold,
        timeDiff: timeDiff,
        threshold: this.timeDiffThreshold

      };

      return callback && callback(res);

    };

    Pulse.prototype.alertResurrection = function ( callback ) {

      var eventName = this.pulseEventName;

      $rootScope.$broadcast(eventName);

      return callback && callback();

    };

    Pulse.prototype.watch = function ( callback ) {

      var self = this;

      this.checkPulse(function (data) {

        if(data.resurrected){

          self.alertResurrection(function() {
            return callback && callback();
          });

        }

      });
    };

    return new Pulse();

  });