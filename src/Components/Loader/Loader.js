// Imports
import Spinner from 'react-spinner-material';
import styles from "./Loader.module.css";
import load from "./../../Data/output-onlinegiftools.gif"

// Component to show loading while data loads
export default function Loader(){
  return (
    //! Use react-spinner-material
      <div className={styles.divContainer}>
        <Spinner radius={120} color={"#7064E5"} stroke={2} visible={true} />
      </div>

      //! Use Normal .Gif
      // <div className={styles.divContainer}>
      //   <img src={load} alt='Loading'/>
      // </div>
  
    );
}