// src/widgets/AccountOverview/variants.js
export const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  export const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: "tween", duration: 0.5 } }
  };
  
// src/widgets/AccountOverview/variants.js
export const sewerContainer = {
    hidden: { opacity: 0, height: 0, overflow: 'hidden' },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      }
    }
  };
  
  export const sewerItem = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };
  