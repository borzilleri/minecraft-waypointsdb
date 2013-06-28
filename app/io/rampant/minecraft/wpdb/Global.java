package io.rampant.minecraft.wpdb;

import com.github.jmkgreen.morphia.logging.MorphiaLoggerFactory;
import com.github.jmkgreen.morphia.logging.slf4j.SLF4JLogrImplFactory;
import com.google.inject.Guice;
import com.google.inject.Injector;
import io.rampant.minecraft.wpdb.modules.MongoDB;
import io.rampant.minecraft.wpdb.modules.Play;
import play.Application;
import play.GlobalSettings;

/**
 * @author Jonathan Bozilleri
 */
public class Global extends GlobalSettings {
	private static final Injector INJECTOR = createInjector();

	private static Injector createInjector() {
		return Guice.createInjector(new Play(), new MongoDB());
	}

	@Override
	public void beforeStart(Application application) {
		MorphiaLoggerFactory.reset();
		MorphiaLoggerFactory.registerLogger(SLF4JLogrImplFactory.class);
	}

	@Override
	public <A> A getControllerInstance(Class<A> aClass) throws Exception {
		return INJECTOR.getInstance(aClass);
	}
}