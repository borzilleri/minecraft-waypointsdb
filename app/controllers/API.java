package controllers;

import io.rampant.minecraft.wpdb.dao.PointDAO;
import models.Point;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

public class API extends Controller {
	private PointDAO dao;

	@Inject
	public API(PointDAO pointDAO) {
		dao = pointDAO;
	}

	public Result list() {
		return ok(Json.toJson(dao.find().asList()));
	}

	public Result get(String id) {
		Point p = dao.get(id);
		if( null == p ) {
			return notFound();
		}
		return ok(p.toJson());
	}

	public Result save(String id) {
		return ok();
	}

	public Result destroy(String id) {
		return ok();
	}

}
