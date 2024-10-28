import React, { useEffect, useState } from "react";
import { getAllSlotsBooked, bookSlot, cancelSlot } from "../../../services/userService";
import { convertTo12Hour } from "../../doctor/slot/BookingSlots";
import { Datepicker, Modal } from "flowbite-react";
import Swal from "sweetalert2"; // For confirmation dialogs

function BookedSlots(props) {
  const { patient,patientData } = props;
  const [slotsAvailable, setSlotsAvailable] = useState([]);
  const [slotsDisplayed, setSlotsDisplayed] = useState([]);
  const [dates, setDates] = useState(new Set());
  const [datesDisplayed, setDatesDisplayed] = useState(new Set());
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const todayDate = new Date();

  const onLoad = async () => {
    let slots = await getAllSlotsBooked({ patientId: patientData._id });
    if(slots.length>0){
      slots=slots.sort((a,b)=>a.startTime-b.startTime)
    }
    await setSlotsAvailable(slots);
    await setSlotsDisplayed(slots);
  };

  useEffect(() => {
    onLoad();
    document.getElementById(`id_allDates`).checked = true;
  }, []);

  useEffect(() => {
    if (slotsAvailable.length > 0) {
      const uniqueDates = new Set([...dates]);
      slotsAvailable.forEach((slot) => uniqueDates.add(slot.date));
      setDates(uniqueDates);
      setDatesDisplayed(uniqueDates);
    }
  }, [slotsAvailable]);

  const handleDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleDateChange = async (selectedDate) => {
    const formattedDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    const filteredSlots = slotsAvailable.filter((slot) => slot.date === formattedDate);
    document.getElementById(`id_allDates`).checked = false;
    setSlotsDisplayed(filteredSlots);
    setDatesDisplayed(new Set([formattedDate]));
  };

  const handleCancel = async (e, slot) => {
    // e.stopPropagation();
    const result = await Swal.fire({
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ok",
      title: "Confirmation",
      text: "Can we proceed to Cancel the slot...?",
    });

    if (result.isConfirmed) {
      await cancelSlot({  id: slot._id });
      await onLoad();
    }
  };

  return (
    <div className="h-[100vh] flex flex-col flex-1">
      <div className="h-[20%] grow flex flex-col gap-4 m-10">
      <div className="flex flex-row gap-40 justify-center items-center">
        <div className="flex flex-row gap-4">
          <label className="font-bold" htmlFor="searchDate">Search</label>
          <Datepicker
            name="filterDate"
            id="id_filterDate"
            minDate={todayDate}
            className="rounded text-slate-800"
            onSelectedDateChanged={handleDateChange}
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <input
            type="checkbox"
            name="allDates"
            id="id_allDates"
            onChange={(e) => e.target.checked && onLoad()}
          />
          <label htmlFor="allDates">ALL</label>
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-10">
        <h2 className="font-bold">Slots Booked</h2>
        {Array.from(datesDisplayed).map((date, index) => (
          <div key={index} className="flex flex-col gap-8 border rounded-lg shadow-lg p-4">
            <h2 className="font-bold text-emerald-500">{date}</h2>
            <div className="grid grid-cols-3 gap-2">
              {slotsDisplayed.map((slot, index) =>
                slot.date === date && (
                  <div
                    key={index}
                    className={`border p-4 flex flex-col gap-4 rounded shadow-xl bg-yellow-300`}
                    
                  >
                    {slot.confirmStatus && <h3 className="font-bold text-white">Slot Confirmed</h3>}
                    
                    <div className="flex flex-row justify-between">
                      <span className="font-bold">{convertTo12Hour(slot.startTime)}</span>
                      <span className="font-bold text-black-800">to</span>
                      <span className="font-bold">{convertTo12Hour(slot.endTime)}</span>
                    </div>

                    <div className="flex flex-row gap-4 items-center">
                      {slot.doctorId.profileImage && (
                        <img
                          src={`data:image/jpeg;base64,${slot.doctorId.realProfileImage}`}
                          alt={`${slot.doctorId.firstName}'s profile`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="flex flex-row justify-between">
                          <span className="font-bold text-blue-600">Doctor:</span>
                          <span className="font-bold">{slot.doctorId.firstName} {slot.doctorId.lastName}</span>
                        </div>
                        <div className="flex flex-row justify-between gap-5">
                          <span className="font-bold text-blue-600">Specialization:</span>
                          <span className="font-bold">{slot.doctorId.specialization}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row gap-4">
                      <button
                        className={`p-4 text-center rounded font-bold bg-red-500`}
                        onClick={(e) => handleCancel(e, slot)}
                      >
                       Cancel
                      </button>
                      <button
                        className={`p-4 text-center rounded font-bold bg-white`}
                        onClick={() => handleDoctorDetails(slot.doctorId)}
                        
                      >
                       view Details
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedDoctor && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>{selectedDoctor.firstName} {selectedDoctor.lastName}'s Details</Modal.Header>
        <Modal.Body>
            {selectedDoctor.profileImage && (
                <div className="flex justify-center mb-4">
                    <img
                        src={`data:image/jpeg;base64,${selectedDoctor.realProfileImage}`}
                        alt={`${selectedDoctor.firstName}'s profile`}
                        className="rounded-full w-32 h-32 object-cover"
                    />
                </div>
            )}
            <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
            <p><strong>Gender:</strong> {selectedDoctor.gender}</p>
            <p><strong>Height:</strong> {selectedDoctor.height}</p>
            <p><strong>Weight:</strong> {selectedDoctor.weight}</p>
            <p><strong>Blood Group:</strong> {selectedDoctor.bloodGroup}</p>
            {/* Add more details as needed */}
        </Modal.Body>
        <Modal.Footer>
            <button onClick={() => setShowModal(false)} className="p-2 bg-blue-500 text-white rounded">Close</button>
        </Modal.Footer>
    </Modal>
    
      )}
    </div>
    </div>
  );
}

export default BookedSlots;
