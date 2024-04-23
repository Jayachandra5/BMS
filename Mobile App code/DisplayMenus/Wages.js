import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const Wages = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [selectedAttendance, setSelectedAttendance] = useState('Absent');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://192.168.56.1:5000/api/EmployeeAttendanceList');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);



  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Wages</Text>

      <View style={styles.headingRow}>
        <Text style={styles.subHeading}>Employee Name</Text>
        <Text style={styles.subHeading}>salary</Text>
      </View>

      <View>
        {employees.map((employee) => (
          <View key={employee.id} style={styles.employeeRow}>
            <Text>{employee.empname}</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[styles.radioButton, attendanceStatus[employee.empname] === 'Present' && styles.radioButtonSelected]}
                onPress={() => handleAttendanceChange(employee.empname, 'Present')}
              />
              <TouchableOpacity
                style={[styles.radioButton, attendanceStatus[employee.empname] === 'Half Present' && styles.radioButtonSelected]}
                onPress={() => handleAttendanceChange(employee.empname, 'Half Present')}
              />
              <TouchableOpacity
                style={[styles.radioButton, attendanceStatus[employee.empname] === 'Absent' && styles.radioButtonSelected]}
                onPress={() => handleAttendanceChange(employee.empname, 'Absent')}
              />
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.doneButtonContainer} onPress={giveWage}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subHeading: {
    fontWeight: 'bold',
  },
  attendanceOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  employeeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  radioButtonSelected: {
    backgroundColor: 'black',
  },
  doneButtonContainer: {
    backgroundColor: 'black',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Wages;
