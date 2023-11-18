import { useEffect,useContext } from 'react';
import {
  useDisclosure,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  PopoverCloseButton,
  Button
} from '@chakra-ui/react'
import { ScrollYContext } from '@/providers/appProvider';
type Props =  {
  isOpen:boolean,
  onOpen:()=>void,
  onClose:()=>void,
  doSomething:()=>void
}

const ConsentModal:React.FC<Props> = ({isOpen,onOpen,onClose,doSomething}) => {
  const scrollY = useContext(ScrollYContext);

  useEffect(()=>{
    onClose();
  },[scrollY])
  return (
    <>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement='top-start'
        closeOnBlur={true}
      >
        <PopoverContent>
          <PopoverBody>
          <Button onClick={doSomething} className="w-full h-full bg-transparent border-transparent text-black border-2 p-2 rounded-md focus:outline-none text-red-500">
            フォローを解除
          </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}
export default ConsentModal;