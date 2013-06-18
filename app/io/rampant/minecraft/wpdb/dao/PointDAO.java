package io.rampant.minecraft.wpdb.dao;

import com.github.jmkgreen.morphia.Morphia;
import com.github.jmkgreen.morphia.dao.BasicDAO;
import com.mongodb.Mongo;
import models.Point;
import org.bson.types.ObjectId;

import javax.inject.Inject;

public class PointDAO extends BasicDAO<Point, ObjectId> {
	@Inject
	public PointDAO(Mongo mongo, Morphia morphia) {
		// TODO: Put this string in a config file
		super(mongo, morphia, "mc_wpdb");
	}

	public models.Point findByName(String name) {
		return ds.createQuery(entityClazz).field("name").equal(name).get();
	}

	public models.Point get(String id) {
		return get(new ObjectId(id));
	}

}
