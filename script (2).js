import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// --- PASTE YOUR FIREBASE CONFIGURATION BOX HERE ---
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCYqKDK1Tx7uEJQlnVI1397S0JBvmm038I",
    authDomain: "anatomy-8f743.firebaseapp.com",
    projectId: "anatomy-8f743",
    storageBucket: "anatomy-8f743.firebasestorage.app",
    messagingSenderId: "809599544299",
    appId: "1:809599544299:web:d1ecec43d1bb5f55dbc7ae"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const scoresRef = ref(database, "quizScores");

const quizData = [
    // SECTION 1
    { 
        q: "With regard to the pectoral girdle:", 
        a: [["a", "contains three joints, the sternoclavicular, the acromioclavicular and the glenohumeral"], ["b", "serratus anterior, the rhomboids and subclavius attach the scapula to the axial skeleton"], ["c", "pectoralis major and deltoid are the only muscular attachments between the clavicle and the upper limb"], ["d", "teres major provides attachment between the axial skeleton and the girdle"]], 
        correct: "b",
        explanation: "The scapula lacks a direct bony attachment to the axial skeleton; instead, it is anchored entirely by a muscular sling composed of the serratus anterior, rhomboids, trapezius, levator scapulae, and subclavius."
    },
    { 
        q: "Choose the odd muscle out as regards insertion/origin:", 
        a: [["a", "supraspinatus"], ["b", "subscapularis"], ["c", "biceps"], ["d", "teres minor"], ["e", "deltoid"]], 
        correct: "c",
        explanation: "Supraspinatus, infraspinatus, subscapularis, teres minor, and deltoid all take origin directly from the scapular bone infrastructure. The biceps brachii is unique here because it inserts distally onto the radius, acting primarily on the forearm."
    },
    { 
        q: "Which muscle does not insert in or next to the intertubercular groove of the upper humerus?", 
        a: [["a", "pectoralis major"], ["b", "pectoralis minor"], ["c", "latissimus dorsi"], ["d", "teres major"]], 
        correct: "b",
        explanation: "Pectoralis minor inserts onto the coracoid process of the scapula, not the humerus. A useful trick for the other options is the phrase 'A Lady Between Two Majors': Latissimus dorsi inserts into the floor of the intertubercular groove, flanked by Pectoralis major on the lateral lip and Teres major on the medial lip."
    },
    { 
        q: "Identify the incorrect pairing for testing muscles:", 
        a: [["a", "latissimus dorsi – abduct to 60° and adduct against resistance"], ["b", "trapezius – shrug shoulders against resistance"], ["c", "rhomboids – place hands on hips and draw elbows back and scapulae together"], ["d", "serratus anterior – push with arms outstretched against a wall"]], 
        correct: "a",
        explanation: "To test the latissimus dorsi, the patient's arm is abducted to 90 degrees and then adducted against resistance, or you can feel the muscle belly contract during an intentional cough."
    },
    { 
        q: "Identify the incorrect innervation:", 
        a: [["a", "subclavius – own nerve from the brachial plexus"], ["b", "serratus anterior – long thoracic nerve"], ["c", "clavicular head of pectoralis major – medial pectoral nerve"], ["d", "latissimus dorsi – dorsal scapular nerve"], ["e", "trapezius – accessory nerve"]], 
        correct: "d",
        explanation: "The latissimus dorsi is innervated by the thoracodorsal nerve (middle subscapular nerve) from the posterior cord of the brachial plexus. The dorsal scapular nerve instead supplies the rhomboids and levator scapulae."
    },
    { 
        q: "Which muscle does not extend from the posterior surface of the scapula to the greater tubercle of the humerus?", 
        a: [["a", "teres major"], ["b", "infraspinatus"], ["c", "supraspinatus"], ["d", "teres minor"]], 
        correct: "a",
        explanation: "Teres major travels from the inferior angle of the scapula to the *medial lip of the intertubercular groove* on the anterior aspect of the humerus. The others all insert onto the greater tubercle facets."
    },
    { 
        q: "With regard to action, which muscle is the odd one out?", 
        a: [["a", "teres minor"], ["b", "deltoid"], ["c", "teres major"], ["d", "subscapularis"]], 
        correct: "b",
        explanation: "The deltoid is primarily an abductor of the arm (via its middle fibers). Teres minor, teres major, and subscapularis primarily act as rotators and adductors of the glenohumeral joint."
    },
    { 
        q: "Which statement is INCORRECT?", 
        a: [["a", "the muscles of the rotator cuff are deemed to be such because all their tendons fuse with the lateral part of the shoulder capsule and are attached to the humerus near the joint"], ["b", "the capsule of the shoulder joint is attached at the line of the anatomical head except inferiorly where it extends to the level of the surgical neck"], ["c", "the subacromial bursa lies between the tendon of supraspinatus and the coraco-acromial ligament and communicates with the shoulder joint"], ["d", "the long tendon of biceps lies intracapsular and is sheathed by synovial membrane that allows it to slide with movement"]], 
        correct: "c",
        explanation: "The subacromial bursa does *not* normally communicate with the glenohumeral joint cavity. If a connection is found during imaging, it usually indicates a pathological tear in the supraspinatus tendon."
    },
    { 
        q: "Stabilising factors of the shoulder joint include all but:", 
        a: [["a", "a tight capsule"], ["b", "tendons that fuse with the capsule"], ["c", "glenohumeral and coracohumeral ligaments"], ["d", "labrum"], ["e", "splinting of the humeral head between the tendons of biceps and triceps"]], 
        correct: "a",
        explanation: "The shoulder joint capsule is remarkably loose and redundant, especially inferiorly, to allow for a wide range of motion. It provides little inherent structural stability."
    },
    { 
        q: "Regarding the brachial plexus, which is INCORRECT?", 
        a: [["a", "it is derived from the anterior rami of C5-T1 after they have given off segmental supply to the prevertebral and scalene muscles"], ["b", "the roots give off three branches including the long thoracic nerve to latissimus dorsi"], ["c", "the trunks give off one branch"], ["d", "the cords are divided into anterior and posterior divisions that supply the flexor and extensor compartments respectively and give off 13 branches"], ["e", "the lateral cord supplies part of the median nerve"]], 
        correct: "b",
        explanation: "The long thoracic nerve (C5, C6, C7) arises from the roots, but it supplies the *serratus anterior* muscle, not the latissimus dorsi."
    },
    { 
        q: "Regarding lymph nodes, the lateral side of the arm and forearm is drained initially to the:", 
        a: [["a", "supratrochlear nodes"], ["b", "posterior axillary nodes"], ["c", "infraclavicular nodes"], ["d", "central axillary nodes"]], 
        correct: "c",
        explanation: "Lymphatic vessels ascending along the path of the cephalic vein on the lateral side of the arm bypass the armpits entirely and empty directly into the infraclavicular nodes."
    },
    { 
        q: "Which of the following has some nerve supply from the radial nerve?", 
        a: [["a", "long head of biceps"], ["b", "coracobrachialis"], ["c", "short head of biceps"], ["d", "brachialis"]], 
        correct: "d",
        explanation: "While the brachialis is primarily supplied by the musculocutaneous nerve, its lateral portion receives a small prophetic branch from the radial nerve."
    },
    { 
        q: "As it emerges from the axilla, the median nerve lies where with regards to the brachial artery?", 
        a: [["a", "lateral"], ["b", "anterior"], ["c", "medial"], ["d", "posterior"]], 
        correct: "a",
        explanation: "In the upper arm, the median nerve begins *lateral* to the brachial artery. As it moves down toward the elbow, it crosses over the front of the artery to sit on its medial side within the cubital fossa."
    },
    { 
        q: "With regards to the posterior compartment of the arm, which is FALSE?", 
        a: [["a", "the medial head of triceps lies deep to the long and lateral heads"], ["b", "triceps inserts onto the upper surface of the olecranon"], ["c", "midshaft fracture of the humerus can damage the radial nerve resulting in paralysis of triceps"], ["d", "the medial intermuscular septum divides it from the anterior compartment and runs from the axilla to the elbow"]], 
        correct: "c",
        explanation: "A midshaft fracture damages the radial nerve within the spiral groove, which compromises the brachioradialis and forearm extensors (causing wrist drop). However, it leaves the triceps largely intact because the branches supplying the triceps branch off higher up in the axilla."
    },
    { 
        q: "Blood supply to the upper limb, which is FALSE?", 
        a: [["a", "the subclavian artery is divided schematically by scalenus anterior"], ["b", "usually all branches of the subclavian come from the first segment"], ["c", "the dorsal scapular branch may arise from the third segment"], ["d", "pectoralis major schematically divides the axillary artery into three parts"], ["e", "the acromial branch of the thoracoacromial trunk accompanies the cephalic vein in the deltopectoral triangle"]], 
        correct: "d",
        explanation: "The axillary artery is divided into three functional parts by the *pectoralis minor* muscle, not the pectoralis major."
    },
    { 
        q: "Regarding the brachial plexus, which is FALSE?", 
        a: [["a", "the nerve to serratus anterior comes from the anterior rami of C5-C7"], ["b", "the suprascapular nerve arises from C5 anterior ramus"], ["c", "the divisions are at the level of the clavicle"], ["d", "the thoracodorsal nerve arises from the posterior cord"], ["e", "the radial nerve is the largest branch of the brachial plexus"]], 
        correct: "b",
        explanation: "The suprascapular nerve branches off from the *upper trunk* (formed by the union of the C5 and C6 roots), not directly from a single anterior ramus."
    },
    { 
        q: "Regarding the brachial plexus:", 
        a: [["a", "the lateral cord contains fibres from C5, 6, 7 & 8"], ["b", "the posterior cord has fibres from C5, 6, 7, 8 & T1"], ["c", "the medial cord has fibres from C8 and T1"], ["d", "the suprascapular nerve arises from C5"], ["e", "the ulnar nerve is a continuation of the medial cord"]], 
        correct: "b",
        explanation: "The posterior cord receives fibers from the posterior divisions of all three trunks, aggregating contributions from the C5, C6, C7, C8, and T1 nerve roots."
    },
    { 
        q: "Which is CORRECT?", 
        a: [["a", "medial pectoral nerve C7 C8"], ["b", "ulnar nerve C7 C8 T1"], ["c", "dorsal scapular nerve C5 C6"], ["d", "long thoracic nerve C6 C7 C8"], ["e", "musculocutaneous C5 C6"]], 
        correct: "e",
        explanation: "The musculocutaneous nerve derives its fibers from the C5, C6, and C7 roots via the lateral cord. The C5 and C6 components are responsible for biceps brachii innervation."
    },
    { 
        q: "Regarding the brachial plexus:", 
        a: [["a", "the roots lie behind scalenus medius muscle"], ["b", "the trunks are formed behind the clavicle"], ["c", "at the first rib, the cords are formed"], ["d", "the cords give branches around second part of artery"]], 
        correct: "d",
        explanation: "The cords are named (lateral, medial, posterior) based on their anatomical position relative to the *second part* of the axillary artery, which lies tucked behind the pectoralis minor."
    },
    { 
        q: "In the cubital fossa:", 
        a: [["a", "median nerve lies lateral to the biceps tendon"], ["b", "radial nerve and interosseous branch lies beneath the brachialis"], ["c", "radial artery passes between heads of pronator teres"], ["d", "brachial artery lies beneath biceps aponeurosis"], ["e", "radial nerve leaves fossa between heads of supinator"]], 
        correct: "d",
        explanation: "The bicipital aponeurosis (biceps aponeurosis) spreads medially across the cubital fossa, offering a layer of protection to the underlying brachial artery and median nerve."
    },
    { 
        q: "The clavicle:", 
        a: [["a", "ossifies at eight weeks"], ["b", "has atypical synovial joints at both ends"], ["c", "articulates with the first rib"], ["d", "is more curved in females"], ["e", "usually fractures between deltoid tubercle and coranoid tubercle"]], 
        correct: "c",
        explanation: "The clavicle is bound to the first rib via the strong costoclavicular ligament, stabilizing the sternoclavicular joint structure."
    },
    { 
        q: "Regarding innervation of hand muscles:", 
        a: [["a", "opponens pollicis may be supplied by ulnar nerve"], ["b", "opponens digiti minimi may be supplied by median nerve"], ["c", "two radial interossei are usually supplied by median nerve"], ["d", "nail beds are supplied 3½ to 1½ by branches of radial and ulnar nerves"], ["e", "adductor pollicis is supplied by muscular (recurrent) branch of median nerve"]], 
        correct: "a",
        explanation: "Anatomical variations are common in the hand; the thenar muscles (like opponens pollicis) can sometimes have a dual or variant supply from the deep branch of the ulnar nerve."
    },
    { 
        q: "At the wrist / carpal tunnel:", 
        a: [["a", "flexor retinaculum attaches to scaphoid and trapezoid laterally"], ["b", "all superficial and deep flexors, except flexor pollicis longus, share a common flexor sheath"], ["c", "the ulnar nerve lies medial to pisiform"], ["d", "tendons of flexor digitorum remain attached until they reach the palm"], ["e", "median nerve lies beneath flexor retinaculum between flexor digitorum superficialis and flexor pollicis longus"]], 
        correct: "e",
        explanation: "The median nerve travels through the carpal tunnel directly beneath the flexor retinaculum, running alongside the tendons of flexor digitorum superficialis and flexor pollicis longus."
    },
    { 
        q: "Axillary artery:", 
        a: [["a", "first part is separated from the cords by axillary sheath"], ["b", "lies posterior lateral to vein – all three parts"], ["c", "medial root of median nerve crosses behind artery to join lateral root."], ["d", "leaves axilla through quadrangular space"], ["e", "supplies the breast via thoracoacromial branch"]], 
        correct: "b",
        explanation: "Throughout its course, the axillary artery maintains a consistent relationship with the axillary vein, which runs along its anterior and medial sides."
    },
    { 
        q: "All the following arise from the common extensor origin EXCEPT:", 
        a: [["a", "extensor carpi radialis brevis"], ["b", "extensor carpi radialis longus"], ["c", "extensor digitorum"], ["d", "extensor digitorum minimi"], ["e", "extensor carpi ulnaris"]], 
        correct: "b",
        explanation: "Extensor carpi radialis longus takes origin higher up from the *lateral supracondylar ridge* of the humerus, rather than the common extensor tendon on the lateral epicondyle."
    },
    { 
        q: "Regarding triceps:", 
        a: [["a", "lateral head arises from humerus below radial groove"], ["b", "midshaft humerus fractures may paralyse triceps"], ["c", "has an insertion into the elbow joint capsule"], ["d", "aids in adduction of shoulder"], ["e", "is pierced by ulnar nerve"]], 
        correct: "c",
        explanation: "The triceps brachii sends small slips of deep muscle tissue to insert into the posterior capsule of the elbow joint, pulling it out of the way during extension to prevent it from getting pinched."
    },
    { 
        q: "Which of the following pairs do not match with regard to mode of ossification?", 
        a: [["a", "ribs and cranium"], ["b", "clavicle and humerus"], ["c", "femur and 1st metatarsal"], ["d", "patella and pisiform"], ["e", "mandible and clavicle"]], 
        correct: "b",
        explanation: "The clavicle undergoes intramembranous ossification (forming directly from mesenchymal tissue sheets), while the long humerus undergoes endochondral ossification (forming from a cartilage model template)."
    },
    { 
        q: "Which joint is the odd one out with regard to degrees of freedom?", 
        a: [["a", "1st carpometacarpal joint"], ["b", "radiohumeral joint"], ["c", "sternoclavicular joint"], ["d", "acromioclavicular joint"], ["e", "radiocarpal joint"]], 
        correct: "d",
        explanation: "The acromioclavicular joint is a plane synovial joint that permits only basic gliding movements, giving it fewer degrees of freedom than the more mobile options listed."
    },
    { 
        q: "Which of the statements regarding ligaments is FALSE?", 
        a: [["a", "ligaments are relatively avascular"], ["b", "final healing following sprains usually restores full strength"], ["c", "torn ligaments may predispose to dislocation"], ["d", "Sharpey's fibres penetrate the bone"], ["e", "a healed sprain may be predisposed to reinjury"]], 
        correct: "b",
        explanation: "Because ligaments have a limited, sparse blood supply, healed ligament tissue rarely regains its original tensile strength, making the joint more prone to re-injury."
    },
    { 
        q: "Regarding cartilage, which is FALSE?", 
        a: [["a", "it is essentially avascular"], ["b", "hyaline cartilage contains hyaluronic acid"], ["c", "rib cartilage is elastic type"], ["d", "TMJ is fibrous"], ["e", "all contain mucopolysaccharides"]], 
        correct: "c",
        explanation: "Costal (rib) cartilage is hyaline cartilage, not elastic cartilage. True elastic cartilage is found in areas that need to retain flexible shape, like the outer ear and epiglottis."
    },
    { 
        q: "Regarding types of joints, which pairing is CORRECT?", 
        a: [["a", "diarthrosis – cranial suture"], ["b", "synarthrosis – symphysis pubis"], ["c", "amphiarthrosis – sternoclavicular joint"], ["d", "gomphosis – intervertebral joints"], ["e", "syndesmoses – tibiofibular joint"]], 
        correct: "e",
        explanation: "A syndesmosis is a fibrous joint where bones are joined by an interosseous sheet, a classic example being the inferior tibiofibular joint."
    },
    { 
        q: "Types of muscles, which pairing is INCORRECT?", 
        a: [["a", "unipennate – flexor pollicis longus"], ["b", "bipennate – 4th lumbrical"], ["c", "fusiform – supraspinatus"], ["d", "bipennate – soleus"], ["e", "multi-pennate – anterior deltoid"]], 
        correct: "b",
        explanation: "The 4th lumbrical is a bipennate muscle, meaning its fibers run obliquely to insert into both sides of the central tendon."
    },
    { 
        q: "Regarding muscle strength, which is NOT a factor?", 
        a: [["a", "resting length of muscle"], ["b", "cross sectional area"], ["c", "lever arm length"], ["d", "the extent to which the muscle is contracted"], ["e", "configuration of fibres, eg fusiform, c.f. bipennate"]], 
        correct: "d",
        explanation: "While the state of contraction affects immediate force production, it does not define the baseline potential *strength* capacity of the muscle tissue itself."
    },
    { 
        q: "Regarding the autonomic nervous system, visceral pain is not referred to L3-5 and S1 because:", 
        a: [["a", "there are no visceral afferents related to these lumbar splanchnic nerves"], ["b", "there are no white rami communicans to these spinal nerves"], ["c", "there are no sympathetic ganglia associated with theses spinal segments"], ["d", "there is no sympathetic efferent supply to these spinal nerves"], ["e", "there are no grey rami communicans associated with the autonomic ganglia of L3-S1 spinal nerves"]], 
        correct: "b",
        explanation: "White rami communicantes, which carry preganglionic sympathetic fibers, are only present between the T1 and L2 spinal cord segments. They do not exist in the lower lumbar or sacral levels."
    },

    // SECTION 2
    { 
        q: "At the elbow joint:", 
        a: [["a", "the tilt of the trochlear of the humerus is the main cause for the carrying angle of the elbow"], ["b", "the capsule is not attached to the radius"], ["c", "the annular ligament is attached to the head and neck of the radius"], ["d", "the middle band is the strongest of the three bands that make up the ulnar collateral ligament"], ["e", "the carrying angle is the angle between the extended ulna and the vertical"]], 
        correct: "a",
        explanation: "The carrying angle is a natural outward tilt of the forearm when the arm is extended. It is caused by the asymmetry of the humerus's trochlea, where the medial lip projects further down than the lateral lip."
    },
    { 
        q: "Regarding palmar spaces:", 
        a: [["a", "the hypothenar space contains the long tendon of abductor digiti minimi"], ["b", "the midpalmar space is deep to the common synovial sheath and flexor tendons"], ["c", "the midpalmar space is not continuous with the three ulnar lumbrical canals"], ["d", "the thenar space is open at the wrist"], ["e", "prevent spread of infection"]], 
        correct: "b",
        explanation: "The midpalmar space sits behind the long flexor tendons and their shared synovial bursa, positioning it right in front of the palmar interosseous muscles and metacarpal bones."
    },
    { 
        q: "Which is NOT an origin of supinator?", 
        a: [["a", "radial tuberosity"], ["b", "radial collateral ligament"], ["c", "lateral epicondyle of humerus"], ["d", "supinator crest of ulna"], ["e", "aponeurosis overlying supinator muscle"]], 
        correct: "a",
        explanation: "The supinator muscle wraps around the upper radius and *inserts* onto the lateral surface of the radial shaft near the radial tuberosity. It does not originate from it."
    },
    { 
        q: "Regarding the nerves and vessels of the arm:", 
        a: [["a", "the circumflex vessels and the axillary nerve enter the extensor compartment in the axilla through the triangular space"], ["b", "the ulnar nerve pierces the lateral intermuscular septum in the lower third of the arm"], ["c", "the median nerve crosses obliquely in front of the radial artery in the arm"], ["d", "supratrochlear lymph nodes lie in the subcutaneous tissue just above the medial epicondyle"], ["e", "the basilic vein is lateral to the cephalic vein"]], 
        correct: "d",
        explanation: "The supratrochlear lymph nodes sit in the superficial tissues just above the medial epicondyle of the humerus, where they filter lymph fluid coming up from the medial side of the hand and forearm."
    },
    { 
        q: "Brachial plexus:", 
        a: [["a", "the five roots lie in front of scalenus anterior muscle"], ["b", "the anterior division of the central trunk runs on as the medial cord"], ["c", "the suprascapular nerve is the only branch from the trunks"], ["d", "the radial nerve is a branch of the lateral cord"], ["e", "the ulnar nerve is a branch of the posterior cord"]], 
        correct: "c",
        explanation: "The suprascapular nerve (C5, C6) is the only major branch that arises from the trunks of the brachial plexus—specifically branching off the upper trunk."
    },
    { 
        q: "The musculocutaneous nerve passes through which muscle?", 
        a: [["a", "coracobrachialis"], ["b", "short head of biceps"], ["c", "brachialis"], ["d", "medial head of triceps"], ["e", "long head of biceps"]], 
        correct: "a",
        explanation: "The musculocutaneous nerve pierces directly through the belly of the coracobrachialis muscle as it leaves the axilla, giving off motor branches to supply it along the way."
    },
    { 
        q: "What structure does NOT lie in the anatomical snuff box?", 
        a: [["a", "cephalic vein"], ["b", "radial artery"], ["c", "radial styloid"], ["d", "first metacarpal bone"], ["e", "extensor pollicis longus"]], 
        correct: "e",
        explanation: "Extensor pollicis longus forms the *medial boundary border* of the snuff box. Its tendon does not sit inside the floor of the box itself."
    },
    { 
        q: "Latissimus dorsi:", 
        a: [["a", "is an accessory muscle of inspiration and expiration"], ["b", "is supplied by the dorsal scapular nerve"], ["c", "forms the lower border of the medially axillary fold"], ["d", "laterally rotates the humerus"], ["e", "lies superficial to trapezius at its upper border"]], 
        correct: "a",
        explanation: "Because it attaches to the ribs and spine, the latissimus dorsi acts as an accessory respiratory muscle. It helps compress the torso during forced exhalation, like coughing or sneezing."
    },
    { 
        q: "Regarding the shoulder joint, which is INCORRECT?", 
        a: [["a", "full abduction requires medial rotation"], ["b", "the long head of biceps is intracapsular"], ["c", "the subacromial bursa is attached to the coracoacromial ligaments"], ["d", "flexion involves pec major, deltoid, coracobrachialis and biceps"], ["e", "supraspinatus initiates abduction"]], 
        correct: "a",
        explanation: "To fully abduct the arm to 180 degrees, the humerus must *laterally (externally)* rotate. This rotation clears the greater tubercle from hitting the acromion process."
    },
    { 
        q: "In the forearm:", 
        a: [["a", "the median nerve passes between the two heads of pronator teres"], ["b", "the ulnar nerve lies deep to flexor digitorum profundus"], ["c", "superficial fibres of flexor digitorum superficialis gives rise to the tendons for index and middle fingers"], ["d", "the radial artery is on the lateral side of the radial nerve"], ["e", "the fibres of the interosseous membrane run obliquely down from ulna to radius"]], 
        correct: "a",
        explanation: "The median nerve enters the forearm by passing right between the deep and superficial heads of the pronator teres muscle. This is a common site for nerve entrapment."
    },
    { 
        q: "What structure does NOT pierce the clavipectoral fascia?", 
        a: [["a", "cephalic vein"], ["b", "lymphatics"], ["c", "lateral thoracic artery"], ["d", "lateral pectoral nerve"], ["e", "thoracoacromial artery"]], 
        correct: "c",
        explanation: "The structures that pierce the clavipectoral fascia can be remembered with the acronym **CALL**: **C**ephalic vein, **A**nd lymphatics, **L**ateral pectoral nerve, and the **L**atest thoracoacromial artery. The lateral thoracic artery runs lower down and does not cross it."
    },
    { 
        q: "Regarding the thumb:", 
        a: [["a", "abductor pollicis longus originates from both radius and ulna"], ["b", "opponens pollicis rotates the first metacarpal on the triquetral"], ["c", "adductor pollicis inserts on to the radial sesamoid of the thumb, then the base of the proximal phalanx"], ["d", "nerve supply is by the median nerve (C7, C8)"], ["e", "adductor pollicis lies superficial to the thenar space"]], 
        correct: "a",
        explanation: "The abductor pollicis longus muscle has a broad origin in the forearm, arising from the posterior shafts of both the radius and the ulna, as well as the interosseous membrane between them."
    },
    { 
        q: "Which artery is the main supply of triceps?", 
        a: [["a", "dorsal scapular artery"], ["b", "brachial artery"], ["c", "profunda brachii artery"], ["d", "radial artery"], ["e", "posterior circumflex humeral artery"]], 
        correct: "c",
        explanation: "The profunda brachii artery (deep artery of the arm) branches off the brachial artery high up and travels into the posterior compartment along the spiral groove to supply the triceps."
    },
    { 
        q: "Teres major:", 
        a: [["a", "receives its nerve supply from the lateral cord of the brachial plexus"], ["b", "is part of the medial wall of the axilla"], ["c", "forms the medial border of the triangular space"], ["d", "is separated from teres minor by the long head of triceps"], ["e", "has the same nerve supply as teres minor"]], 
        correct: "d",
        explanation: "The long head of the triceps brachii passes vertically between the teres minor (above) and the teres major (below), creating the boundaries for the quadrangular and triangular anatomical spaces."
    },
    { 
        q: "Regarding the brachial plexus:", 
        a: [["a", "the dorsal scapular nerve is the only branch from the trunks"], ["b", "the axillary nerve is derived from C5, 6, 7, 8, T1"], ["c", "the ulnar nerve is the largest branch of the whole plexus"], ["d", "the axillary nerve passes below teres major"], ["e", "the thoracodorsal nerve supplies latissimus dorsi"]], 
        correct: "e",
        explanation: "The thoracodorsal nerve (arising from the posterior cord with fibers from C6, C7, and C8) travels down the posterior axillary wall to provide motor innervation to the latissimus dorsi."
    },
    { 
        q: "Flexor pollicis longus:", 
        a: [["a", "is a bipennate muscle"], ["b", "arises from the common flexor origin"], ["c", "pierces the flexor retinaculum at the wrist"], ["d", "inserts into the radial border of the proximal phalanx"], ["e", "has fleshy fibres to a point, just above the wrist"]], 
        correct: "e",
        explanation: "Flexor pollicis longus remains muscular and fleshy deep in the forearm until just above the wrist, where it transitions into a tendon to enter the carpal tunnel."
    },
    { 
        q: "Which nerve supplies serratus anterior?", 
        a: [["a", "axillary nerve (C5, C6)"], ["b", "long thoracic nerve (C5, C6, C7)"], ["c", "musculocutaneous nerve (C5, C6)"], ["d", "thoracodorsal nerve (C6, C7, C8)"], ["e", "suprascapular nerve (C5, C6)"]], 
        correct: "b",
        explanation: "The long thoracic nerve arises directly from the C5, C6, and C7 nerve roots. It runs downward across the superficial surface of the serratus anterior muscle to supply it."
    },
    { 
        q: "At the elbow joint:", 
        a: [["a", "there is no communication with the proximal radioulnar joint"], ["b", "the capsule is attached to the neck of the radius"], ["c", "the radial collateral ligament is made up of three bands"], ["d", "the ulnar nerve passes between the anterior and posterior bands of the ulnar collateral ligament"], ["e", "the carrying angle is greater in men"]], 
        correct: "d",
        explanation: "The ulnar nerve runs behind the medial epicondyle and enters the forearm by passing right between the anterior and posterior bands of the ulnar collateral ligament."
    },
    { 
        q: "Which structure does NOT insert into the flexor retinaculum?", 
        a: [["a", "abductor pollicis brevis"], ["b", "flexor digiti minimi brevis"], ["c", "palmaris longus"], ["d", "opponens pollicis"], ["e", "flexor pollicis brevis"]], 
        correct: "d",
        explanation: "Opponens pollicis takes origin *from* the flexor retinaculum and inserts onto the shaft of the first metacarpal bone to pull the thumb into opposition. It does not insert into the retinaculum."
    },
    { 
        q: "Which nerve does NOT make contact with periosteum?", 
        a: [["a", "radial nerve"], ["b", "axillary nerve"], ["c", "median nerve"], ["d", "ulnar nerve"], ["e", "anterior interosseous nerve"]], 
        correct: "c",
        explanation: "The median nerve travels down the center of the arm and forearm surrounded by muscle tissue, never running directly along the surface of a bone (periosteum) like the radial, axillary, or ulnar nerves do."
    },
    { 
        q: "Regarding the clavicle, which is false?", 
        a: [["a", "the clavicle is longer and its curvatures more pronounced in the male"], ["b", "the articulating sternal end is covered by fibrocartilage"], ["c", "it is the first bone to ossify in the foetus"], ["d", "it has four named ligaments attached to it"], ["e", "fractures of the clavicle tend to occur between the costoclavicular and the coracoclavicular ligaments"]], 
        correct: "a",
        explanation: "This statement is false. The female clavicle is typically thinner, smoother, and less curved than the male clavicle, which tends to be thicker and more heavily curved due to muscle pull."
    },
    { 
        q: "Which is true of muscles of the pectoral girdle?", 
        a: [["a", "“direct” muscles are inserted into the clavicle or scapula from the axial skeleton, eg pectoralis major"], ["b", "“indirect” attachment to the axial skeleton is represented by serratus anterior"], ["c", "the sternocostal fibres of pectoralis major from the 6th costal cartilage are inserted higher on the lateral lip of the bicipital groove than the fibres from the first cartilage"], ["d", "biceps muscle gives no stability to the shoulder joint"], ["e", "trapezius is the only muscle to be supplied by all five segments of the brachial plexus"]], 
        correct: "c",
        explanation: "The lower fibers of the pectoralis major (from the 6th costal cartilage) twist behind the upper fibers, inserting higher up on the lip of the bicipital groove and creating the rounded shape of the anterior axillary fold."
    },
    { 
        q: "The clavipectoral fascia is pierced by all but one of the following structures:", 
        a: [["a", "lymphatic drainage from the infraclavicular nodes to apical axillary nodes"], ["b", "cephalic vein"], ["c", "lateral pectoral nerve"], ["d", "thoracoacromial artery"], ["e", "pectoralis minor"]], 
        correct: "e",
        explanation: "The clavipectoral fascia splits to surround the pectoralis minor muscle, but the muscle itself does not pierce the fascia layer."
    },
    { 
        q: "With respect to the axilla:", 
        a: [["a", "the thoracodorsal nerve runs posterior to the mid axillary line on serratus anterior, which it supplies"], ["b", "the axillary artery is divided into three parts by scalenus anterior"], ["c", "the lateral wall is made up of latissimus dorsi tendon, subscapularis, teres major"], ["d", "the lateral thoracic vein is connected by the thoracoepigastric vein to the superficial epigastric vein, therefore bypassing the IVC in its obstruction"], ["e", "the axillary vein commences at the upper border of teres major as a continuation of the basilic vein"]], 
        correct: "d",
        explanation: "The thoracoepigastric vein connects the lateral thoracic vein (SVC system) with the superficial epigastric vein (IVC system), acting as a crucial backup route if the Inferior Vena Cava becomes blocked."
    },
    { 
        q: "With respect to the brachial plexus:", 
        a: [["a", "it consists of the entire anterior rami of C5 to T1"], ["b", "there are five roots, three trunks, five divisions and three cords"], ["c", "there are two branches from the divisions"], ["d", "there are a total of 13 branches from the cords"], ["e", "there are two branches from the roots"]], 
        correct: "d",
        explanation: "The cords of the brachial plexus collectively give off 13 branches: 3 from the lateral cord, 5 from the medial cord, and 5 from the posterior cord."
    },
    { 
        q: "With respect to the brachial plexus:", 
        a: [["a", "the lateral cord lies in the axilla"], ["b", "the median nerve is the largest branch of the whole plexus"], ["c", "the roots lie within the posterior triangle of the neck"], ["d", "the ulnar nerve is a branch of the lateral cord"], ["e", "the musculocutaneous nerve is a branch of the medial cord"]], 
        correct: "a",
        explanation: "The cords of the brachial plexus exit the neck and sit inside the axilla, wrapping tightly around the second part of the axillary artery."
    },
    { 
        q: "The blood supply to the breast involves all but one of the following:", 
        a: [["a", "lateral thoracic artery"], ["b", "long thoracic artery"], ["c", "internal thoracic artery"], ["d", "posterior intercostal artery"], ["e", "thoracoacromial artery"]], 
        correct: "b",
        explanation: "There is no artery named the 'long thoracic artery.' The long thoracic structure refers strictly to the *nerve* that supplies the serratus anterior muscle."
    },
    { 
        q: "Which muscle takes origin (in part) from both the medial and lateral intermuscular septa?", 
        a: [["a", "biceps"], ["b", "brachioradialis"], ["c", "extensor carpi radialis longus"], ["d", "supinator"], ["e", "triceps"]], 
        correct: "e",
        explanation: "The medial head of the triceps brachii has a broad origin in the posterior arm, anchoring to both the medial and lateral intermuscular septa."
    },
    { 
        q: "The carpus:", 
        a: [["a", "there are five extensor tunnel compartments"], ["b", "the extensor expansion attaches to the anterolateral border of the radius above the styloid process, and distally to the pisiform and trapezoid bones"], ["c", "the radiocarpal joint is an uniaxial synovial joint"], ["d", "there are no muscular attachments to the extensor surface of the carpus"], ["e", "the bones palpable in the anatomical snuff box are the radial styloid, triquetral, scaphoid and base of first metacarpal"]], 
        correct: "d",
        explanation: "No muscles insert onto the back (extensor surface) of the carpal bones. Forearm extensor tendons pass right over the wrist to insert further down onto the bases of the metacarpals."
    },
    { 
        q: "Which is true?", 
        a: [["a", "the flexor synovial sheath is only continuous from wrist to distal phalanx in the thumb"], ["b", "the medial cutaneous nerve is the smallest nerve branch of the brachial plexus"], ["c", "the capitate bone within the carpus is the last of these to ossify"], ["d", "the pisiform bone is the first bone of the carpus to ossify"], ["e", "superficial lymphatics lie with arteries, deep lymphatics with veins"]], 
        correct: "a",
        explanation: "In the hand, the synovial sheath for the flexor pollicis longus (the radial bursa) runs continuously from the wrist all the way to the tip of the thumb. The sheaths for the index, middle, and ring fingers stop short in the palm."
    }
];

let currentStudent = "";
let currentQuestionIdx = 0;
let score = 0;
let hasAnswered = false;

// Attach functions to global scope so HTML can see them with type="module" active
window.startQuiz = function(event) {
    event.preventDefault();
    const nameInput = document.getElementById("username").value.trim();
    if (!nameInput) return;

    currentStudent = nameInput;
    document.getElementById("display-name").innerText = currentStudent;

    document.getElementById("login-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    currentQuestionIdx = 0;
    score = 0;
    document.getElementById("score-counter").innerText = "Score: 0";
    
    loadQuestion();
};

function loadQuestion() {
    hasAnswered = false;
    document.getElementById("next-button").style.display = "none";
    document.getElementById("explanation-box").style.display = "none";
    
    const qData = quizData[currentQuestionIdx];
    document.getElementById("question-number").innerText = `Question ${currentQuestionIdx + 1} of ${quizData.length}`;
    document.getElementById("question-text").innerText = qData.q;
    
    const progressPercent = (currentQuestionIdx / quizData.length) * 100;
    document.getElementById("progress").style.width = `${progressPercent}%`;

    const container = document.getElementById("options-container");
    container.innerHTML = "";

    qData.a.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = `(${opt[0].toUpperCase()}) ${opt[1]}`;
        btn.onclick = () => selectOption(btn, opt[0]);
        container.appendChild(btn);
    });
}

function selectOption(selectedBtn, key) {
    if (hasAnswered) return;
    hasAnswered = true;

    const qData = quizData[currentQuestionIdx];
    const buttons = document.getElementById("options-container").getElementsByClassName("option-btn");

    if (key === qData.correct) {
        selectedBtn.classList.add("correct");
        score++;
        document.getElementById("score-counter").innerText = `Score: ${score}`;
        
        confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 }
        });
    } else {
        selectedBtn.classList.add("incorrect");
        Array.from(buttons).forEach((btn, idx) => {
            if (qData.a[idx][0] === qData.correct) {
                btn.classList.add("correct");
            }
        });
    }

    document.getElementById("explanation-text").innerText = qData.explanation;
    document.getElementById("explanation-box").style.display = "block";

    Array.from(buttons).forEach(btn => btn.disabled = true);
    document.getElementById("next-button").style.display = "block";
}

window.nextQuestion = function() {
    currentQuestionIdx++;
    if (currentQuestionIdx < quizData.length) {
        loadQuestion();
    } else {
        endQuizAndSave();
    }
};

function endQuizAndSave() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("results-screen").style.display = "block";
    
    document.getElementById("progress").style.width = "100%";
    document.getElementById("final-score").innerText = `${score} / ${quizData.length}`;

    const timestamp = new Date().toLocaleString([], { hour: '2-digit', minute:'2-digit', month: 'short', day: 'numeric' });
    
    // Save to Firebase Cloud Database
    push(scoresRef, {
        date: timestamp,
        name: currentStudent,
        result: `${score} / ${quizData.length}`
    });
}

// Live update listener: pulled down automatically from Firebase
onValue(scoresRef, (snapshot) => {
    const data = snapshot.val();
    const tbody = document.getElementById("leaderboard-body");
    tbody.innerHTML = "";

    if (data) {
        // Convert object into array and reverse it to show the latest score at the top
        const items = Object.values(data).reverse();
        items.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row.date}</td>
                <td><strong>${row.name}</strong></td>
                <td>${row.result}</td>
            `;
            tbody.appendChild(tr);
        });
    }
});

window.restartToLogin = function() {
    document.getElementById("start-form").reset();
    document.getElementById("score-counter").innerText = "Score: 0";
    document.getElementById("results-screen").style.display = "none";
    document.getElementById("login-screen").style.display = "block";
};