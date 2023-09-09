import React, { useEffect, useState } from "react";
import axios from "axios";
import store from "../Redux/Store";
import { useSelector } from "react-redux";
import { Input, Button, Select } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useDisclosure } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'


export default function Mid_Body() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [s1, setS1] = useState("");
  const [selectedType, setSelectedType] = useState(""); 
  const [selectedStatus, setSelectedStatus] = useState("");
  const value = useSelector((storedata) => storedata);
  const [p,setP]=useState(1);
  




  useEffect(() => {
    fetchData(); 
  }, [selectedType, selectedStatus,p]); 

  const fetchData = () => {
    let url = `https://api.spacexdata.com/v3/capsules?limit=4&`;

if (p) {
  let x = (p - 1) * 10;
  url += `offset=${x}&`;
}

if (selectedType) {
  url += `type=${selectedType}&`;
}
if (selectedStatus) {
  url += `status=${selectedStatus}&`;
}

    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        store.dispatch({
          type: "space",
          payload: res.data,
        });
      })
      .catch((err) => {
        setError(err);
        setData([]);
      });
  };

  const handleClick = () => {
    if (s1) {
      axios
        .get(`https://api.spacexdata.com/v3/capsules/${s1}`)
        .then((res) => {
          setData([res.data]);
          setError(null);
          store.dispatch({
            type: "space",
            payload: [res.data],
          });
        })
        .catch((err) => {
          setError(err);
          setData([]);
        });
    } else {
      setError(new Error("Serial number is empty"));
      setData([]);
    }
  };

  return (
    <div>
      <div className="background-container">
        <div className="bottom-left">
          <p>RECENT LAUNCH</p>
          <h3>STARLINK MISSION</h3>
          <button className="btn">REWATCH</button>
        </div>
      </div>

      <div className="background-container1">
        <div className="search-btn">
          <Input
            variant="filled"
            placeholder="Search Capsule by serial number... "
            w="400px"
            className="input-box"
            onChange={(e) => {
              setS1(e.target.value);
            }}
          />
          &nbsp;&nbsp;&nbsp;
          <Button
            leftIcon={<SearchIcon />}
            colorScheme="gray"
            variant="solid"
            className="input-btn"
            onClick={handleClick}
          >
            Search
          </Button>
          <div className="search-filters">
          <Select  className="select-one"
          variant='filled'
            placeholder="Select Type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="Dragon 1.0">Dragon 1.0</option>
            <option value="Dragon 1.1">Dragon 1.1</option>
            <option value="Dragon 2.0">Dragon 2.0</option>
      
          </Select>&nbsp;&nbsp;&nbsp;
          <Select className="select-two"  style={{marginRight:"20px"}}
          variant='filled'
            placeholder="Select Status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="retired">Retired</option>
          </Select>
        </div>
        </div>

        

        {error ? (
          <div>
            <h1 className="NoData">No Data Found</h1>
          </div>
        ) : data.length > 0 ? (
          <div className="Data-grid" >
            {value.data.map((elem) => {
              return (
                <div key={elem.capsule_id} className="sub-box">
                  <img style={{borderRadius:"20px"}} src="https://petapixel.com/assets/uploads/2020/05/449431C7-AF1E-4716-8DE9-7AF14EF80F10-800x450.jpg" alt="Capsule" />
                   <h1>{elem.capsule_id}</h1>
                  <h1 className="SeriesNo">Capsule Series No. {elem.capsule_serial}</h1>
                  <VerticallyCenter data={elem}/>
                </div>
              );
            })}
          </div>
        ) : (
          <h1 className="NoData">No Data Found</h1>
        )}

        <Button isDisabled={p==1} onClick={()=>{
              setP(p-1)
        }}>Prev</Button> <Button>{p}</Button> <Button isDisabled={p==2} onClick={()=>{
           setP(p+1);
        }}> Next</Button>
      
      </div>
     
    </div>
  );
}


function VerticallyCenter({data}) {
  var info={data}
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <Button onClick={onOpen} size='sm' style={{marginTop:"5px",marginBottom:"5px"}}> More Details</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Capsule Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <h1>Capsule Series  : {info.data.capsule_serial}</h1>
           <h1>Capsule Id :{info.data.capsule_id}</h1>
           <h1>Status : {info.data.status}</h1>
           <h1>Original Launch : {info.data.original_launch}</h1>
           <h1>Details : {info.data.details}</h1>
           <h1>Type : {info.data.type}</h1>
          
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
