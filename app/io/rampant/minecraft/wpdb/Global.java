package io.rampant.minecraft.wpdb;

import com.github.jmkgreen.morphia.logging.MorphiaLoggerFactory;
import com.github.jmkgreen.morphia.logging.slf4j.SLF4JLogrImplFactory;
import com.google.inject.Guice;
import com.google.inject.Injector;
import io.rampant.minecraft.wpdb.dao.PointDAO;
import io.rampant.minecraft.wpdb.modules.MongoDB;
import io.rampant.minecraft.wpdb.modules.Waypoints;
import models.Point;
import play.Application;
import play.GlobalSettings;

/**
 * @author Jonathan Bozilleri
 */
public class Global extends GlobalSettings {
	static Injector injector;

	@Override
	public void beforeStart(Application application) {
		MorphiaLoggerFactory.reset();
		MorphiaLoggerFactory.registerLogger(SLF4JLogrImplFactory.class);
		injector = Guice.createInjector(new Waypoints(), new MongoDB());
	}

	@Override
	public void onStart(Application application) {
		/**
		 * FIXME: Abstract this out somewhere?
		 *
		 * This is sort of hacky. We probably want to initialize some database
		 * data. This is a great place to *trigger* it, but not a great place to
		 * keep it. meh.
		 */

		PointDAO dao = injector.getInstance(PointDAO.class);
		Point p = dao.findByName("Home");
		if( null == p ) {
			p = new Point();
			p.name = "Home";
			p.color = "FF0000";
			p.x = 10;
			p.z = 20;
			p.y = 75;
			p.dimension = "0";

			dao.save(p);
		}

		p = dao.findByName("Away");
		if( null == p ) {
			p = new Point();
			p.name = "Away";
			p.color = "00FF00";
			p.x = 30;
			p.z = 40;
			p.y = 24;
			p.dimension = "0";

			dao.save(p);
		}

	}

	@Override
	public <A> A getControllerInstance(Class<A> aClass) throws Exception {
		return injector.getInstance(aClass);
	}

	public static Injector getInjector() {
		return injector;
	}
}
