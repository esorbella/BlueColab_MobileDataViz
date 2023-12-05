import java.util.ArrayList;
/**
 * Write a description of class SensorDataList here.
 *
 * @author (your name)
 * @version (a version number or a date)
 */
public class SensorDataList
{
    // instance variables - replace the example below with your own
    private int x;
    
    private ArrayList<Sensor> sList; // Create an ArrayList object

    /**
     * Constructor for objects of class SensorDataList
     */
    public SensorDataList()
    {
        sList = new ArrayList<>();
    }
  
    public ArrayList getList(){
        return sList;
    }
    
}
