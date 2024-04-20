import React, { useEffect, useState } from 'react';
import { Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import { addDoc, collection } from 'firebase/firestore';
import db from '../firebase';

const FormAddAntrian: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [typeAntrian, setTypeAntrian] = useState<string>("");
  const [noAntrian, setNoAntrian] = useState<string>("");
  const [noPlate, setNoPlate] = useState<string>("");
  const antrianCollections = collection(db, "antrians");



  const generateNoAntrian = () => {
    if (typeAntrian === "booking") {
      return 'B' + Math.floor(Math.random() * 100);
    } else if (typeAntrian === "non-booking") {
      return 'A' + Math.floor(Math.random() * 100);
    }
    return "";
  }

  const handleSubmit = async () => {
      try{
        await addDoc(antrianCollections, {
            typeantrian: typeAntrian,
            noantrian: noAntrian,
            noplate: noPlate
        });
        onCloseModal();
        alert("Data Berhasil ditambahkan");
        window.location.reload();
      }catch(error){
        console.log(error);
        alert("Data Gagal ditambahkan");
      }
  }

  useEffect(() => {
    if (typeAntrian) {
      setNoAntrian(generateNoAntrian());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ typeAntrian ]);

  const onCloseModal = () => {
    setOpenModal(false);
    setTypeAntrian("");
    setNoAntrian("");
    setNoPlate("");
  }

  const handleTypeAntrianChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeAntrian(e.target.value);
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Buat Antrian</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Masukan Data Antrian</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="type_antrian" value="Pilih type antrian" />
              </div>
              <Select id="type_antrian" required value={typeAntrian} onChange={handleTypeAntrianChange}>
                <option value={"booking"}>Booking</option>
                <option value={"non-booking"}>Non Booking</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="no_antrian" value="Nomor Antrian" />
              </div>
              <TextInput id="no_antrian" type="text" required readOnly value={noAntrian} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="no_plate" value="Nomor Plate" />
              </div>
              <TextInput id="no_plate" type="text" required placeholder='B 1122 TY' onChange={(e) => setNoPlate(e.target.value)} value={noPlate} />
            </div>
            <div className="w-full">
              <Button onClick={handleSubmit}>Kirim</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FormAddAntrian;
