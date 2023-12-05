
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
    private double pH;

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
}
