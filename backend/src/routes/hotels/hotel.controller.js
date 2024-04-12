
// get all hotels
export const getHotels = async (req, res) => {
    const start = new Date().getTime();
    try {
        return res.status(200).send({
            data: [],
            success: true,
            exe_time: new Date().getTime() - start,
        });
    } catch (error) {
        console.log('internal server error', error.message);
        return res.status(500).send({
            error: error.message,
            success: false,
            exe_time: new Date().getTime() - start,
        });
    }
};