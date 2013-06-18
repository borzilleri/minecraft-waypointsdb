package controllers

import play.api.mvc.{Controller, Action}
import play.api.Routes
import play.api.cache.Cached
import play.api.Play.current

object Javascript extends Controller {
	def routes = Cached("js-routes") {
		Action {
			implicit request =>
				val jsRoutes = Routes.javascriptRouter("routes")(
					controllers.routes.javascript.API.list,
					controllers.routes.javascript.API.get,
					controllers.routes.javascript.API.save,
					controllers.routes.javascript.API.destroy
				)
				Ok(
					s"define(function () { $jsRoutes; return routes.controllers; });"
				).as(JAVASCRIPT)
		}
	}
}