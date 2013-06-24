package models;

import com.github.jmkgreen.morphia.annotations.Entity;
import com.github.jmkgreen.morphia.annotations.Id;
import org.bson.types.ObjectId;
import org.codehaus.jackson.JsonNode;
import play.data.validation.Constraints;
import play.libs.Json;

import java.util.List;

@Entity("points")
public class Point {
	@Id
	private ObjectId id;

	@Constraints.Required
	public String name;
	public String color = "#FFFFFF";

	/**
	 * East/West.
	 * Positive -> East
	 * Negative -> West
	 */
	@Constraints.Required
	public int x;
	/**
	 * North/South
	 * Positive -> South
	 * Negative -> North
	 */
	@Constraints.Required
	public int z;
	/**
	 * Altitude
	 */
	@Constraints.Required
	public int y;

	/**
	 * Possible values:
	 *
	 *
	 * TODO: Use an ENUM or something for this?
	 */
	public String poiType = "outpost";

	/**
	 * Dimension id
	 * 0 -> Overworld
	 * -1 -> Nether
	 * 7 -> Twilight Forest
	 * ?? -> Wyvern Lair
	 */
	public List<String> dimension;

	public void setId(String id) {
		this.id = new ObjectId(id);
	}

	public String getId() {
		if( null != id ) {
			return id.toString();
		}
		return null;
	}

	public JsonNode toJson() {
		return Json.toJson(this);
	}
}
