package controllers;

import com.google.common.base.Charsets;
import com.google.common.hash.Hashing;
import io.rampant.minecraft.wpdb.dao.PointDAO;
import models.Point;
import org.codehaus.jackson.JsonNode;
import play.cache.Cache;
import play.data.Form;
import play.libs.Json;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.Iterator;

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
		if( null != id && null == dao.get(id) ) {
			return notFound();
		}

		Form<Point> form = Form.form(Point.class).bindFromRequest();
		if( form.hasErrors() ) {
			return badRequest(form.errorsAsJson());
		}

		Point p = form.get();
		// TODO: Maybe do field-based updates?
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

	@BodyParser.Of(BodyParser.Json.class)
	public Result buildFile() {
		Iterator<JsonNode> iterator = request().body().asJson().getElements();
		StringBuilder sb = new StringBuilder();

		while( iterator.hasNext() ) {
			Point p = dao.get(iterator.next().asText());
			if( null == p ) {
				continue;
			}
			sb.append(p.toPointString());
		}

		String pointsFile = sb.toString();
		String id = Hashing.goodFastHash(32).hashString(pointsFile, Charsets.UTF_8).toString();

		Cache.set("point_" + id, pointsFile, 60*5);
		return ok(id);
	}
}
