export const sortTasksByNextAppearance = (tasks) => {
    return (
        tasks.sort(function(x, y) {
            if(x.nextAppearance > y.nextAppearance) {
                return 1
            } 
            if (x.nextAppearance < y.nextAppearance) {
                return -1
            }
            return 0
        })
    ) 
}