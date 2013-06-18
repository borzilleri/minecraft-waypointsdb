package io.rampant.minecraft.wpdb.modules;

import com.github.jmkgreen.morphia.Morphia;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.mongodb.Mongo;
import com.mongodb.MongoClient;

import javax.inject.Singleton;
import java.net.UnknownHostException;

public class MongoDB extends AbstractModule {
	@Override
	protected void configure() {
	}

	@Provides
	@Singleton
	public Morphia provideMorphia() {
		return new Morphia();
	}

	@Provides
	@Singleton
	public Mongo provideMongo() throws UnknownHostException {
		return new MongoClient();
	}
}
