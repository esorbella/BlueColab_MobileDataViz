
/**
 * Write a description of class Sensor here.
 *
 * @author (your name)
 * @version (a version number or a date)
 */
public class Sensor
{
    // instance variables - replace the example below with your own
    private double temperature;
    private double turb;
    private final double pH;

    /**
     * Constructor for objects of class Sensor
     */
    public Sensor(double temp, double turbid, double acidity)
    {
        this.temperature = temp;
        this.turb = turbid;
        this.pH = acidity;
    }

    public double getTemperature()
    {
       return temperature;
    }
    public double getTurbidity(){
        return turb;
    }
    public double getpH(){
        return pH;
    }
    
    public void setTemperature(double temperature)
    {
       this.temperature = temperature;
    }
    public void setTurbidity(double turb){
       this.turb = turb;
    }
    public void setpH(double pH){
     //   this.pH = pH;
    }
}
