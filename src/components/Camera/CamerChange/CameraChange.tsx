import { useFrame, useThree } from "@react-three/fiber";
import { Dispatch, SetStateAction, useState } from "react";
import { Vector3 } from "three";

interface IProps {
    isZoomOut: boolean;
    setEnableControls: Dispatch<SetStateAction<boolean>>;
    isStartAnim: boolean;
    setIsStartAnim: Dispatch<SetStateAction<boolean>>;
    startProgress: number;
    setIsZoomOut: Dispatch<SetStateAction<boolean>>;
    setIsShowZoomChanger: Dispatch<SetStateAction<boolean>>;
}

export default function CameraChange({ isZoomOut,
    setEnableControls,
    isStartAnim,
    setIsStartAnim,
    startProgress,
    setIsZoomOut,
    setIsShowZoomChanger
}: IProps) {
    const { camera } = useThree();
    const [used, setUsed] = useState<boolean>(false);
    
    console.log(startProgress);
    console.log(used);
    
    

    useFrame(() => {
        if (isStartAnim) {
            // console.log(1);
            if (!isZoomOut) {
                // console.log(2);

                camera.position.lerp(new Vector3(10.5, 7, 4), 0.05);
                camera.updateProjectionMatrix();

                if (camera.position.distanceTo(new Vector3(10.5, 7, 4)) <= 0.1) {
                    setIsStartAnim(false);
                }
            } else {
                // console.log(startProgress === 100 && used === false);

                if (startProgress === 100 && used === false) {
                    // setTimeout(() => {
                    camera.position.lerp(new Vector3(10.5, 7, 4), 0.05);
                    camera.updateProjectionMatrix();

                    if (camera.position.distanceTo(new Vector3(10.5, 7, 4)) < 0.8) {
                        setIsZoomOut(false);
                        setUsed(true);
                        setIsStartAnim(false);
                        setIsShowZoomChanger(true);
                    }
                    // }, 500);
                } else {
                    camera.position.lerp(new Vector3(30, 20, 10), 0.05);
                    camera.updateProjectionMatrix();

                    if (camera.position.distanceTo(new Vector3(30, 20, 10)) < 0.1) {
                        setIsStartAnim(false);
                        setEnableControls(true);
                    }
                }
            }
        }
    });

    return "";
}
