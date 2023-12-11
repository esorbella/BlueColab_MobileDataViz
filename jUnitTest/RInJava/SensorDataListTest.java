

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.ArrayList;
import java.util.List;
/**
 * The test class SensorDataListTest.
 *
 * @author  (your name)
 * @version (a version number or a date)
 */
public class SensorDataListTest
{
    private SensorDataList dataList;
    
    
    /**
     * Default constructor for test class SensorDataListTest
     */
    public SensorDataListTest()
    {
        dataList = new SensorDataList("choate.csv");
    }

    /**
     * Sets up the test fixture.
     *
     * Called before every test case method.
     */
    @BeforeEach
    public void setUp()
    {
        // we want to keep changes between tests
    }

    /**
     * Tears down the test fixture.
     *
     * Called after every test case method.
     */
    @AfterEach
    public void tearDown()
    {
       // we want to keep changes between tests 
    }
    
    @Test
    /**
     * Test to see if we got the expected temps correctly
     */
    public void testReadTemperature() {
        // array we expect
        Object[] ele = {26.175, 7.18, 7.187, 7.183, 7.182, 7.196, 7.189, 7.202, 7.226, 7.213, 7.221, 7.237, 7.241, 7.231, 7.248, 7.258, 7.256, 7.28, 7.299, 7.301, 7.343, 7.367, 7.394, 7.411, 7.394, 7.421, 7.369, 7.382, 7.42, 7.448, 7.486, 7.48, 7.516};
        // array we got
        assertArrayEquals(ele, dataList.getTemp().toArray() );
    }

    @Test
    /**
     * Test to see if we got the expected turbidity correctly
     */
    public void testReadTurb() {
        Object[] ele = {-2.68, 2.61, 2.59, 2.93, 3.16, 2.76, 2.52, 2.46, 2.23, 2.35, 2.37, 2.24, 2.37, 2.45, 2.1, 2.23, 2.57, 2.57, 2.32, 1.99, 2.07, 2.04, 2.05, 2.07, 2.29, 2.15, 2.33, 2.44, 2.47, 2.2, 2.32, 2.29, 2.38};    
        assertArrayEquals(ele, dataList.getTurb().toArray() );
    }

    @Test
    /**
     * Test to see if we got the expected pHs correctly
     */
    public void testReadPh() {
        Object[] ele = {545445.15, 7.15, 7.15, 7.14, 7.14, 7.14, 7.14, 7.14, 7.15, 7.14, 7.14, 7.15, 7.14, 7.15, 7.15, 7.14, 7.13, 7.14, 7.14, 7.18, 7.15, 7.22, 7.19, 7.18, 7.12, 7.15, 7.13, 7.12, 7.11, 7.12, 7.12, 7.12, 7.11};
        assertArrayEquals(ele, dataList.getpH().toArray() );
    }
    
    @Test
    /**
     * Test to see if we correctly mark data as wrong
     */
    public void testInRangeTemperature() {
        Object[] expectedValues = {false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true};
        assertArrayEquals(expectedValues, dataList.outOfBounds("temperature").toArray() );
    }

    @Test
    /**
     * Test to see if we correctly mark data as wrong
     */
    public void testInRangeTurb() {
        Object[] expectedValues = {false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true};
        assertArrayEquals(expectedValues, dataList.outOfBounds("turb").toArray() );       
    }
    
    @Test
    /**
     * Test to see if we correctly mark data as wrong
     */
    public void testInRangePh() {
        Object[] expectedValues = {false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true};
        assertArrayEquals(expectedValues, dataList.outOfBounds("pH").toArray() );        
    }
    
    @Test
    public void testTempUnitConversationFail() {
        Object[] ele = {26.175, 7.18, 7.187, 7.183, 7.182, 7.196, 7.189, 7.202, 7.226, 7.213, 7.221, 7.237, 7.241, 7.231, 7.248, 7.258, 7.256, 7.28, 7.299, 7.301, 7.343, 7.367, 7.394, 7.411, 7.394, 7.421, 7.369, 7.382, 7.42, 7.448, 7.486, 7.48, 7.516};
        assertArrayEquals(ele, dataList.getTemp().toArray() ); // this should pass 
        dataList.convertUnit("temperature");
        assertArrayEquals(ele, dataList.getTemp().toArray() ); // this should fail - it's comparing F with C. failure is a sign of sucess 
    }
    
    @Test
    public void testTempUnitConversationFail2() {
        Object[] expectedValues = {58.175, 39.18, 39.187, 39.183, 39.182, 39.196, 39.189, 39.202, 39.226, 39.213, 39.221000000000004, 39.237, 39.241, 39.231, 39.248, 39.258, 39.256, 39.28, 39.299, 39.301, 39.343, 39.367, 39.394, 39.411, 39.394, 39.421, 39.369, 39.382, 39.42, 39.448, 39.486, 39.480000000000004, 39.516};
        for (int i = 0; i < 99999999 ; i++)
            dataList.convertUnit("temperature");
        assertArrayEquals(expectedValues, dataList.getTemp().toArray() ); 
    }
    
    @Test
    public void testTempUnitConversation() {
        Object[] expectedValues = {58.175, 39.18, 39.187, 39.183, 39.182, 39.196, 39.189, 39.202, 39.226, 39.213, 39.221000000000004, 39.237, 39.241, 39.231, 39.248, 39.258, 39.256, 39.28, 39.299, 39.301, 39.343, 39.367, 39.394, 39.411, 39.394, 39.421, 39.369, 39.382, 39.42, 39.448, 39.486, 39.480000000000004, 39.516};
        dataList.convertUnit("temperature");
        assertArrayEquals(expectedValues, dataList.getTemp().toArray() ); 
    }
    
    @Test
    public void testTurbUnitConversation() {
       Object[] expectedValues = {-2.68, 2.61, 2.59, 2.93, 3.16, 2.76, 2.52, 2.46, 2.23, 2.35, 2.37, 2.24, 2.37, 2.45, 2.1, 2.23, 2.57, 2.57, 2.32, 1.99, 2.07, 2.04, 2.05, 2.07, 2.29, 2.15, 2.33, 2.44, 2.47, 2.2, 2.32, 2.29, 2.38};    
        dataList.convertUnit("turb");
        assertArrayEquals(expectedValues, dataList.getTurb().toArray() ); 
    }
    
    @Test
    public void testPhUnitConversation() {
        Object[] expectedValues = {545445.15, 7.15, 7.15, 7.14, 7.14, 7.14, 7.14, 7.14, 7.15, 7.14, 7.14, 7.15, 7.14, 7.15, 7.15, 7.14, 7.13, 7.14, 7.14, 7.18, 7.15, 7.22, 7.19, 7.18, 7.12, 7.15, 7.13, 7.12, 7.11, 7.12, 7.12, 7.12, 7.11};
        dataList.convertUnit("pH");
        assertArrayEquals(expectedValues, dataList.getpH().toArray() ); 
    }
    
    @Test
    public void testRandomUnitConversation() {
        Object[] expectedValues = {545445.15, 7.15, 7.15, 7.14, 7.14, 7.14, 7.14, 7.14, 7.15, 7.14, 7.14, 7.15, 7.14, 7.15, 7.15, 7.14, 7.13, 7.14, 7.14, 7.18, 7.15, 7.22, 7.19, 7.18, 7.12, 7.15, 7.13, 7.12, 7.11, 7.12, 7.12, 7.12, 7.11};
        dataList.convertUnit("Dr. Schmidt");
        assertEquals("Error!", dataList.getpH().toArray() ); // fail expected
    }
    
    @Test
    // now a seperate location - check to make sure it changed
    public void testSuccesfullChange() {
        dataList.changeLocation("notChoate.csv");
        Object[] expectedTemp = {4.173, 4.185, 4.189, 4.18, 4.182, 4.197, 4.19, 4.204, 4.223, 4.212, 4.221, 4.239, 4.244, 4.234, 4.246, 4.256, 4.259, 4.279, 4.298, 4.301, 4.346, 4.362, 4.391, 4.408, 4.392, 4.422, 4.365, 4.384, 4.419, 4.448, 4.482, 4.479, 4.518};
        Object[] expectedTurb = {1.684, 1.618, 1.597, 1.938, 2.162, 1.769, 1.523, 1.467, 1.231, 1.352, 1.377, 1.247, 1.377, 1.452, 1.103, 1.238, 1.576, 1.576, 1.329, 0.997, 1.071, 1.041, 1.052, 1.071, 1.295, 1.157, 1.335, 1.442, 1.473, 1.208, 1.324, 1.29, 1.385};
        Object[] expectedpH = {7.151, 7.152, 7.155, 7.147, 7.144, 7.146, 7.143, 7.141, 7.154, 7.141, 7.146, 7.15, 7.144, 7.151, 7.152, 7.143, 7.136, 7.144, 7.145, 7.183, 7.155, 7.225, 7.194, 7.182, 7.124, 7.152, 7.131, 7.121, 7.118, 7.124, 7.122, 7.125, 7.115};
        assertArrayEquals(expectedTemp, dataList.getTemp().toArray() ); 
        assertArrayEquals(expectedTurb, dataList.getTurb().toArray() ); 
        assertArrayEquals(expectedpH, dataList.getpH().toArray() ); 
    }
    
    @Test
    // now a seperate location - check to make sure it changed
    public void testSuccesfullChangeUnitConverations() {
        dataList.changeLocation("notChoate.csv");
        Object[] expectedTemp = {36.173, 36.185, 36.189, 36.18, 36.182, 36.197, 36.19, 36.204, 36.223, 36.212, 36.221000000000004, 36.239, 36.244, 36.234, 36.246, 36.256, 36.259, 36.278999999999996, 36.298, 36.301, 36.346000000000004, 36.362, 36.391, 36.408, 36.392, 36.422, 36.365, 36.384, 36.419, 36.448, 36.482, 36.479, 36.518};
        Object[] expectedTurb = {1.684, 1.618, 1.597, 1.938, 2.162, 1.769, 1.523, 1.467, 1.231, 1.352, 1.377, 1.247, 1.377, 1.452, 1.103, 1.238, 1.576, 1.576, 1.329, 0.997, 1.071, 1.041, 1.052, 1.071, 1.295, 1.157, 1.335, 1.442, 1.473, 1.208, 1.324, 1.29, 1.385};
        Object[] expectedpH = {7.151, 7.152, 7.155, 7.147, 7.144, 7.146, 7.143, 7.141, 7.154, 7.141, 7.146, 7.15, 7.144, 7.151, 7.152, 7.143, 7.136, 7.144, 7.145, 7.183, 7.155, 7.225, 7.194, 7.182, 7.124, 7.152, 7.131, 7.121, 7.118, 7.124, 7.122, 7.125, 7.115};
        dataList.convertUnit("temperature");
        dataList.convertUnit("turb");
        dataList.convertUnit("pH");
        assertArrayEquals(expectedTemp, dataList.getTemp().toArray() ); 
        assertArrayEquals(expectedTurb, dataList.getTurb().toArray() ); 
        assertArrayEquals(expectedpH, dataList.getpH().toArray() ); 
    }    
}
