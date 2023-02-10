
import { useState } from 'react'
import './App.css'
import Select, { Option } from './components/Select'

function App() {

  const [selectedItems, setSelectedItems] = useState<Option[]>([])

  const selectCallback = (options: Option[]) => {
    console.log("I have been called meaning Select component state has been changed!")

    console.log("Select state is: ", options)

    // setSelectedItems(()=>[{title:'something'}]);
  }


  return (
    <>
      <div className='container'>
        {/* <p className='max-w-xl mx-auto'>{selectedItems.toString()}</p> */}
        <div className='py-8'>
          <h1 className='font-bold text-2xl lg:text-4xl text-center'>This is a component where you can select stuff and delete them</h1>
          <p className='mt-8 text-center'>It can work great if you want to filter items. For example: filter mobile phones based on brand ie. Samsung, Iphone, Huawei, etc. </p>
        </div>
        <div className='mt-16'>
          <Select options={[{title:'Samsung'}, {title:'Huawei'}, {title:'Iphone'}, {title:'Motorola'}, {title:'One Plus'}]} onChange={selectCallback}/>
        </div>
      </div>
    </>
  )
}

export default App
