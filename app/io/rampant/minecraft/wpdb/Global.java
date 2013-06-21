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

import java.util.ArrayList;
import java.util.HashSet;

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

	}

	@Override
	public <A> A getControllerInstance(Class<A> aClass) throws Exception {
		return injector.getInstance(aClass);
	}

	public static Injector getInjector() {
		return injector;
	}
}
