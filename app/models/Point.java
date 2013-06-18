package models;

import com.github.jmkgreen.morphia.annotations.Entity;
import com.github.jmkgreen.morphia.annotations.Id;
import org.bson.types.ObjectId;
import org.codehaus.jackson.JsonNode;
import play.libs.Json;

@Entity("points")
public class Point {
	@Id
	private ObjectId id;
	public String name;
	public String color;

	/**
	 * East/West.
	 * Positive -> East
	 * Negative -> West
	 */
	public int x;
	/**
	 * North/South
	 * Positive -> South
	 * Negative -> North
	 */
	public int z;
	/**
	 * Altitude
	 */
	public int y;

	public String poiType;
	/**
	 * Dimension id
	 * 0 -> Overworld
	 * -1 -> Nether
	 * 7 -> Twilight Forest
	 * ?? -> Wyvern Lair
	 */
	public String dimension;

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
