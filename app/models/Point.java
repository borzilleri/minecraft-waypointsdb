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
	public static final String CACHE_PREFIX = "point_";

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
	 * <p/>
	 * <p/>
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

	/**
	 * name:home,x:-92,z:236,y:65,enabled:true,red:0.0,green:1.0,blue:0.0,suffix:,world:,dimensions:-1#0#
	 * name:Away,x:-89,z:370,y:71,enabled:true,red:0.9577651,green:0.99486566,blue:0.9250362,suffix:,world:,dimensions:-1#0#
	 *
	 * @return String representation for use in .points file
	 */
	public String toPointString() {
		StringBuilder sb = new StringBuilder();

		// Point Name
		sb.append("name:").append(name);

		// Point Coordinates
		sb.append(",x:").append(x);
		sb.append(",z:").append(z);
		sb.append(",y:").append(y);

		// Point visibility
		// TODO: Do we want to implement this?
		sb.append(",enabled:").append("true");

		// Point Color
		// TODO: Convert hex to these floats
		sb.append(",red:").append("1.0");
		sb.append(",green:").append("1.0");
		sb.append(",blue:").append("1.0");

		// TODO: What are these?
		sb.append(",suffix:").append("");
		sb.append(",world:").append("");

		// Point Dimensions
		sb.append(",dimensions:");
		for( String dim : dimension ) {
			sb.append(dim).append("#");
		}

		return sb.append("\n").toString();
	}
}
