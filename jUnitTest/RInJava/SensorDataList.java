import java.util.ArrayList;
import java.util.Arrays;
/**
 * Write a description of class SensorDataList here.
 * 
 * Test Converting Units
 * Marking as Good and Bad
 * Changing locations
 *
 * @author BlueJelly
 * @version (a version number or a date)
 */
public class SensorDataList
{
    // instance variables - replace the example below with your own 
    // OMG constants
    private int tempMin = 0;
    private int tempMax = 24;
    
    private double pHMin = 7;
    private double pHMax = 8;
    
    private double turbMin = 0;
    private double turbMax = 24;
    
    private double ratio = 9/5;
    private double constantC = 32;
    

    
    private ArrayList<Sensor> sList; // Create an ArrayList object

    /**
     * Constructor for objects of class SensorDataList
     */
    public SensorDataList(String filename)
    {
        SensorReader sensorReader = new SensorReader();
        sList = sensorReader.getSensos(filename);
    }
    
    /**
     * Change data completly
     */
    public void changeLocation(String filename) {
        SensorReader sensorReader = new SensorReader();
        sList = sensorReader.getSensos(filename);
    }
  
    /**
     * Return the whole sensor data
     */
    public ArrayList<Sensor> getList(){
        return sList;
    }
    
    /**
     * Only return temps.
     */
    public ArrayList<Double> getTemp() {
        ArrayList<Double> temps = new ArrayList<Double>();
        for (Sensor sensor : sList) {
            temps.add(sensor.getTemperature());
        }
        return temps;        
    }
    
    /**
     * Only return turbidity
     */
    public ArrayList<Double> getTurb() {
        ArrayList<Double> turbs = new ArrayList<Double>();
        for (Sensor sensor : sList) {
            turbs.add(sensor.getTurbidity());
        }
        return turbs;        
    }
    
    /**
     * Only return pHs
     */
    public ArrayList<Double> getpH() {
        ArrayList<Double> pHs = new ArrayList<Double>();
        for (Sensor sensor : sList) {
            pHs.add(sensor.getpH());
        }
        return pHs;   
    }
    
    public ArrayList<Boolean> outOfBounds(String parameter) {
        ArrayList<Boolean> isValid = new ArrayList<Boolean>(); 
        if (parameter.equals("temperature")) {
            isValid = isValidTemp();
        } else if (parameter.equals("turb")) {
            isValid = isValidTurb();
        } else if (parameter.equals("pH")) {
            isValid = isValidpH();
        } 
    
        return isValid;
    }
    
    private ArrayList<Boolean> isValidTemp() {
        ArrayList<Boolean> health = new ArrayList<Boolean>();
        for (Sensor sensor : sList ) {
            if (sensor.getTemperature() < tempMin || sensor.getTemperature() > tempMax) {
                health.add(false);
            } else {
                health.add(true);
            }            
        }
        return health;
    }
    
    private ArrayList<Boolean> isValidTurb() {
        ArrayList<Boolean> health = new ArrayList<Boolean>();
        for (Sensor sensor : sList ) {
            if (sensor.getTurbidity() < turbMin || sensor.getTurbidity() > turbMax) {
                health.add(false);
            } else {
                health.add(true);
            }            
        }
        return health;    
    
    }
    
    private ArrayList<Boolean> isValidpH() {
        ArrayList<Boolean> health = new ArrayList<Boolean>();
        for (Sensor sensor : sList ) {
            if (sensor.getpH() < pHMin || sensor.getpH() > pHMax) {
                health.add(false);
            } else {
                health.add(true);
            }            
        }
        return health;    
    
    }
    
    public void convertUnit(String parameter) {
        if (parameter.equals("temperature")) {
          convertTemperature();
        } else if (parameter.equals("turb")) {
           convertTurb();
        } else if (parameter.equals("pH")) {
           convertpH();
        } 
 
    }

    private void convertTemperature() {
        // for each loops make copies of objects in list, does not mutate array
        // so we must use the tradtional way
        for (int i = 0 ; i < sList.size() ; i++) {
            sList.get(i).setTemperature(convertCToF(sList.get(i).getTemperature())   );
        }   
        
       // System.out.println(Arrays.toString(getTemp().toArray()));
    }
    
    private double convertCToF(double celcius) {
        return celcius * ratio + constantC; // celcius * 9/5 + 32;
    }

    private void convertTurb() {
        for (int i = 0 ; i < sList.size() ; i++) {
            sList.get(i).setTurbidity(sList.get(i).getTurbidity()  ); // no unit conversation needed techinally speaking 
        }   
    }
    
    private void convertpH() {
        // nothing - we don't want to at all
    }
}
