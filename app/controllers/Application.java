package controllers;

import com.google.common.base.Strings;
import play.Logger;
import play.cache.Cache;
import play.mvc.Controller;
import play.mvc.Result;

public class Application extends Controller {

	public Result index() {
		return ok(views.html.index.render());
	}

	public Result download(String file) {
		String pointsFile = (String) Cache.get("points_" + file);
		if( Strings.isNullOrEmpty(pointsFile) ) {
			return notFound();
		}
		String fileName = "world.points";

		response().setContentType("application/x-download");
		response().setHeader("Content-disposition", "attachment; filename=" + fileName);
		return ok(pointsFile);
	}
}
