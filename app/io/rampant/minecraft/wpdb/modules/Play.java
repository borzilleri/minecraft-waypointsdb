package io.rampant.minecraft.wpdb.modules;

import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import play.Configuration;

import javax.inject.Singleton;

public class Play extends AbstractModule {
	protected void configure() {
	}

	@Provides
	@Singleton
	public Configuration provideConfiguration() {
		return play.Play.application().configuration();
	}
}