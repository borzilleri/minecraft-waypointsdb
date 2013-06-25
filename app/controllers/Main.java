package controllers;

import com.google.common.base.Strings;
import models.Point;
import play.Configuration;
import play.cache.Cache;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

public class Main extends Controller {
	Configuration conf;

	@Inject
	public Main(Configuration appConfig) {
		conf = appConfig;
	}

	public Result index() {
		return ok(views.html.index.render());
	}

	public Result download(String file) {
		String pointsFile = (String) Cache.get(Point.CACHE_PREFIX + file);
		if( Strings.isNullOrEmpty(pointsFile) ) {
			return notFound();
		}

		String fileName = conf.getString("minecraft.server") + ".points";

		response().setContentType("application/x-download");
		response().setHeader("Content-disposition", "attachment; filename=" + fileName);
		return ok(pointsFile);
	}
}
