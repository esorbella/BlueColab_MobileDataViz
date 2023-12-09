import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * A class to read CSV-style records of animal sighting reports.
 * 
 * @author David J. Barnes and Michael Kölling
 * @version 2016.02.29
 */
public class SensorReader
{
    // How many fields are expected.
    private static final int NUMBER_OF_FIELDS = 3;
    // Index values for the fields in each record.
    private static final int TEMPERATURE = 0,
                             TURB = 1,
                             PH = 2;
    
    /**
     * Create a SightingReader.
     */
    public SensorReader()
    {
    }
    
    /**
     * Read sightings in CSV format from the given file.
     * Return an ArrayList of Sighting objects created from
     * the information in the file.
     * 
     * @param filename The file to be read - should be in CSV format.
     * @return A list of Sightings.
     */
    public ArrayList<Sensor> getSensos(String filename)
    {
        // Create a Sighting from a CSV input line.
        Function<String, Sensor> createSensor = 
            record -> {
                           String[] parts = record.split(",");
                           if(parts.length == NUMBER_OF_FIELDS) {
                               try {
                                  // double temp = Double.parseDouble(parts[TEMPERATURE].trim());
                                    double temp = Double.parseDouble(parts[TEMPERATURE].trim());
                                   double turb = Double.parseDouble(parts[TURB].trim());
                                   double pH = Double.parseDouble(parts[PH].trim());
                                   return new Sensor(temp, turb, pH);
                               }
                               catch(NumberFormatException e) {
                                   System.out.println("Sensor record has a malformed double: " + record);
                                   return null;
                               }
                           }
                           else {
                               System.out.println("Sensor record has the wrong number of fields: " + record);
                               return null;
                           }
                       };
        ArrayList<Sensor> sensors;
        try {
            sensors = Files.lines(Paths.get(filename))
                             .filter(record -> record.length() > 0 && record.charAt(0) != '#')
                             .map(createSensor)
                             .filter(sighting -> sighting != null)
                             .collect(Collectors.toCollection(ArrayList::new));
        }
        catch(IOException e) {
            System.out.println("Unable to open " + filename);
            sensors = new ArrayList<>();
        }
        return sensors;
    }
    
}
