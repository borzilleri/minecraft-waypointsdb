package controllers;

import io.rampant.minecraft.wpdb.dao.PointDAO;
import models.Point;
import play.data.Form;
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
		// FIXME: This feels inelegant. Is there a better way?
		if( null != id && null == dao.get(id) ) {
			return notFound();
		}

		Form<Point> form = Form.form(Point.class).bindFromRequest();
		// TODO: Do we need both of these?
		if( form.hasErrors() || form.hasGlobalErrors() ) {
			return badRequest("there were errors");
		}

		Point p = form.get();
		/**
		 * TODO: This isn't working right.
		 * Objects coming in with an existent id are not being updated, a new
		 * object is being created.
		 *
		 * Possibly also attempt to use atomic updates of some sort?
		 */
		dao.save(p);
		return ok(p.toJson());
	}

	public Result destroy(String id) {
		Point p = dao.get(id);
		if( null == p ) {
			return notFound();
		}
		dao.delete(p);
		return ok();
	}
}
