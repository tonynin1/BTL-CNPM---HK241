import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { create } from "domain";
import { createPrinter } from "../API/admin/admin";

export default function AddPrinterModal( {onClick} : {onClick?: any} ) {
  const [isAddingPrinter, setIsAddingPrinter] = useState(false);
  const [printerInfo, setPrinterInfo] = useState({
    modal: '',
    brand: '',
    description: '',
    facility: '',
    building: '',
    room: '',
    spsoId: '',
    status: 'valid'
  });

  const handleValueChange = (event: any) => {
      const { name, value } = event.target;
      setPrinterInfo({ ...printerInfo, [name]: value });
  }
  const handleSubmit = async (event: any) => {
      setIsAddingPrinter(true);

      
      const res = await createPrinter(printerInfo.modal, printerInfo.brand, printerInfo.description, printerInfo.facility, printerInfo.building, printerInfo.room, printerInfo.spsoId);
      
      if (res){
        if(res.status === 200){
          setIsAddingPrinter(false);
          toast.success("Thành công!");
        }
        else{
          setIsAddingPrinter(false);
          toast.error("Thất bại!");
        }
        
      }
      else{
        setIsAddingPrinter(false);
        toast.error("Thất bại!");
      }
    //   if (res?.data.status === 200){
    //       setTimeout(() => {
    //         setIsAddingPrinter(false);
    //         toast.success("Thành công!");
    //       }, 5000);
          
    //   }
    //     else {
    //         setIsAddingPrinter(false);
    //         toast.error("Thất bại!");
    //     }
    }


  return (
    <div 
        className="fixed h-screen top-0 left-0 right-0 bottom-0 flex justify-center z-50 bg-black/[0.2]"
        onClick={onClick}
    >
        <ToastContainer />
        <div
            className="absolute top-1/2 transform -translate-y-1/2 rounded overflow-hidden p-8 w-1/2 min-w-[500px] min-h-[500px] bg-white"
            onClick={(e) => e.stopPropagation()}
        >
            <form action={handleSubmit} className="form">
                <p className="text-center text-3xl mb-8">Thêm máy in mới</p>
                <div className="columns-2 mb-8">
                    <div className="flex flex-col">
                        <label className="uppercase" >model</label>
                        <input type="text" className="form-control" name="modal" required autoFocus onChange={handleValueChange}/>
                    </div>
                    <div className="flex flex-col">
                        <label className="uppercase" >tên thương hiệu</label>
                        <input type="text" className="form-control" name="brand" required onChange={handleValueChange}/>
                    </div>
                </div>
                <div className="columns-2 mb-8">
                    <div className="flex flex-col">
                        <label className="uppercase" >mô tả</label>
                        <input type="text" className="form-control" name="description" required onChange={handleValueChange}/>
                    </div>
                    <div className="flex flex-col">
                        <label className="uppercase" >khoa</label>
                        <input type="text" className="form-control" name="facility" required onChange={handleValueChange}/>
                    </div>
                </div>
                <div className="columns-2 mb-8">
                    <div className="flex flex-col">
                        <label className="uppercase" >tòa</label>
                        <input type="text" className="form-control" name="building" required onChange={handleValueChange}/>
                    </div>
                    <div className="flex flex-col">
                        <label className="uppercase" >phòng</label>
                        <input type="text" className="form-control" name="room" required onChange={handleValueChange}/>
                    </div>
                </div>
                <div className="columns-2 mb-8">
                    <div className="flex flex-col">
                        <label className="uppercase" >ID quản lý</label>
                        <input type="number" className="form-control" name="spsoId" required onChange={handleValueChange}/>
                    </div>
                    <div className="flex flex-col">
                        <label className="uppercase">trạng thái</label>
                        <select name="status" className="form-control uppercase" onChange={handleValueChange}>
                            <option className="uppercase" value="valid">valid</option>
                            <option className="uppercase" value="invalid">invalid</option>
                        </select>
                    </div>
                </div>
                <div className="w-fit ml-auto">
                    {!isAddingPrinter?  <button type="submit" className="btn btn-primary">Thêm</button> : <AiOutlineLoading3Quarters className="animate-spin"/>}
                </div>
            </form>
        </div>
    </div>
  )
}