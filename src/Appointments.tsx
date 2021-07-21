import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import styled from 'styled-components';

export const Appointments = () => {
  const [physicianList, setPhysicianList] = useState<Physician[]>([])
  const [appointmentList, setAppointmentList] = useState<Appointment[]>([])
  const [selectedPhysician, setSelectedPhysician] = useState<Physician>({ name: 'Dr. Algernop Krieger', email: 'krieger@isis.spy'})
  interface PhysicianData {
    physicians: [Physician]
  }

  interface Physician {
    name: string;
    email: string;
  }


  const GET_PHYSICIANS = gql`
    query getPhysicians {
      physicians{name, email}
    }
  `;
  interface AppointmentData {
    appointments: [Appointment]
  }
  interface Appointment {
    id: number;
    patient: string;
    time: string;
    kind: 'New-Patient' | 'Follow-Up'
  }

  const GET_APPOINTMENTS = gql`
    query getAppointments {
      appointments{id, patient, time, kind}
    }
  `;



  const { loading: physiciansLoading, data: physicianData } =
    useQuery<PhysicianData>(GET_PHYSICIANS);
  
  
  const { loading: appointmentsLoading, data: appointmentData } =
    useQuery<AppointmentData>(GET_APPOINTMENTS);


  // console.log("loading: ", physiciansLoading, "data?: ", physicianData);
  // console.log("loading: ", appointmentsLoading, "data?: ", appointmentData);
  useEffect(() => {
    if (physicianData) {
      console.log(physicianData)
      const physList = [...physicianData.physicians]
    setPhysicianList(physList)
  }  
    if (appointmentData) {
      const aptList = [...appointmentData.appointments]
    setAppointmentList(aptList)
  }  
}, [physicianData, appointmentData])

  // console.log(physicianList, appointmentList)

  const selectDoc = () => {
    // setSelectedPhysician()
  }

  const makePhysicianList = (): JSX.Element[] => {
    return physicianList.map(physician => {
      return <ListName onClick={selectDoc}>{physician.name}</ListName>
    })
  }

  const makeAppointmentList = (): JSX.Element[] => {
    return appointmentList.map(appointment => {
      return <AppointmentItem>{appointment.id} | {appointment.patient} | {appointment.time} | {appointment.kind}</AppointmentItem>
    })
  }

  return (
    <MainContainer>
      <PhysicianList>
        <NotableLogo>Notable is Op</NotableLogo>
        <DrList>
          <PhysicianHeading>Physicians</PhysicianHeading>
          {makePhysicianList()}
        </DrList>
      </PhysicianList>
      <AppointmentDetails>
        <h1>{selectedPhysician.name}</h1>
        <h3>{selectedPhysician.email}</h3>
        {makeAppointmentList()}
      </AppointmentDetails>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  border: 2px solid gold;
  display: flex;
  flex-direction: row;
`;
const PhysicianList = styled.div`
  border: 2px solid red;
  display: flex;
  flex-direction: column;
`;
const NotableLogo = styled.h2`
  border: 2px solid magenta;
  color: blue;
  flex: 2;
`;
const DrList = styled.ul``;
const ListName = styled.li``;
const AppointmentItem = styled.li`
  list-style: none;
`;
const PhysicianHeading = styled.h3``;
const AppointmentDetails = styled.div`
  border: 2px solid green;
`;
