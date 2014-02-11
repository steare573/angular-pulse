#angular-pulse
=============


##Summary
=============

Service for checking to see if angular app has been "resurrected" from being unfocused/ re-awaken from a sleeping device. This service actually uses a factory so that you can have several different pulse services being used with different thresholds and different events getting fired.


##How it works
=============
Basically, we are checking see that there hasn't been an extended interuption in our application (i.e. js process has not been interupted).  We are checking the "pulse" of our application and making sure that the time since our last "pulse" has not exceeded a particular threshold.  If this happens, we broadcast an event to our application.

##Example
=============
