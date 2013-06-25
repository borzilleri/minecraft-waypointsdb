import sbt._
import Keys._
import play.Project._

object ApplicationBuild extends Build {

  val appName         = "waypointsdb"
  val appVersion      = "2.0-SNAPSHOT"

  val appDependencies = Seq(
    javaCore, javaJdbc, javaEbean,
    "com.google.inject" % "guice" % "3.0" exclude("org.sonatype.sisu.inject","cglib"),
		"com.github.jmkgreen.morphia" % "morphia" % "1.2.3",
		"com.github.jmkgreen.morphia" % "morphia-logging-slf4j" % "1.2.2",
		"org.mongodb" % "mongo-java-driver" % "2.11.1"
  )

  def customLessEntryPoints(base: File): PathFinder = (
    (base / "app" / "assets" / "stylesheets" / "bootstrap" * "bootstrap.less") +++
    (base / "app" / "assets" / "stylesheets" / "bootstrap" * "responsive.less") +++
    (base / "app" / "assets" / "stylesheets" * "*.less")
  )


  val main = play.Project(appName, appVersion, appDependencies).settings(
		lessEntryPoints <<= baseDirectory(customLessEntryPoints),
		resolvers += "Morphia Maven Repo" at "http://morphia.googlecode.com/svn/mavenrepo/",
		resolvers += "MongoDb Java Driver Repository" at "http://repo1.maven.org/maven2/org/mongodb/mongo-java-driver/"
  )

}
