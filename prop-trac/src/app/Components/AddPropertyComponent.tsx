import React, { useState, useEffect } from 'react'

const AddPropertyComponent = () => {

    const [houseNumber, setHouseNumber] = useState<string>('')
    const [street, setStreet] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [zip, setZip] = useState<string>('')
    const [state, setState] = useState<string>('')
    const [houseOrRoomType, setHouseOrRoomType] = useState<string>('')
    const [houseRent, setHouseRent] = useState<number>()
    const [rooms, setRooms] = useState<number>()
    const [baths, setBaths] = useState<number>()
    const [sqft, setSqft] = useState<number>()
    const [amenFeatList, setAmenFeatList] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [roomRent, setRoomRent] = useState<number>()
    const [userID, setUserID] = useState<number>()

    

  return (
    <>
        <div>

        </div>
    </>
  )
}

export default AddPropertyComponent