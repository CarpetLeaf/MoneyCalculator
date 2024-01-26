import { mockProfile } from "../../data/mockData";
import styles from "./Profile.module.scss";

const Profile = () => {
  const userData = mockProfile;
  console.log(userData);

  return (
    <div className={styles.wrapper}>
      <div className={styles.Avatar}>
        <img src={userData.avatarUrl} alt="Users photo"></img>
      </div>
      <div className={styles.userInfo}>
        <p>{userData.name}</p>
        <p>{userData.lastname}</p>
      </div>
    </div>
  );
};

export default Profile;
