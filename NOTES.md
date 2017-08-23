# Details

This is a SPIKE for AethOS to determine how much effort would be required to implement packaging AethOS applications.

Here's what we know so far.

AethOS applications need to be packaged into three bundles:
  
  * Server
  * Middleware (service worker)
  * Client

These three bundles have different entry points, but contain a lot of shared code.

Questions:

 * Can webpack do this?  (yes)
 * Do we have to do anything special for node packages that need to be in a non-server bundle? (i.e. can we forgo JSPM)
 * What is the appropriate project directory structure?
 * What other questions / answers can be determined in this SPIKE?


## Structure

Initially I was leaning towards having a client, server, middleware entrypoints, and then splitting the code into client, server, common (and middleware?) directories, but should the code be structured as endpoints or connections?

The answer is that if we're generating the code via metazen then the metadata should be organized according to connections.

The code that publishes and observes might look different depending on the direction and the location of the endpoint, but we only require a single source of metadata that generates the code.

To reduce the number of moving parts, I'm going to hand-write the code instead of using metazen for this project.  (more useful for others until metazen becomes more widely available).


## Observations

Use webpack instead of gulp.