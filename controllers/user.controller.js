const bcryptjs = require("bcryptjs");
const userService = require("../services/users.services");
const User=require("../models/user.model")
exports.registre = (req, res, next) => {
    const { password } = req.body;
    const salt = bcryptjs.genSaltSync(10);
    req.body.password = bcryptjs.hashSync(password, salt);
    userService.register(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        })
    });
};
exports.login = (req, res, next) => {
    const { username, password } = req.body;
    userService.login({ username, password }, (error, result) => {

        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });


    });
}
exports.userProfile = (req, res, next) => {
    return res.status(200).json({ message: "Authorized User!" });
};

exports.modifyInfo = async(req, res, next) => {
    
    if (req.body.userId === req.params.id ) {
        if (req.body.password) {
            try {
                const salt = bcryptjs.genSaltSync(10);
                req.body.password = bcryptjs.hashSync(  req.body.password, salt);
              } catch (err) {
                return res.status(500).json(err);
              }
             }
try {
                const user = await User.findByIdAndUpdate(req.params.id, {
                  $set: req.body,
                });
                res.status(200).json("Account has been updated");
              } catch (err) {
                return res.status(500).json(err);
              }
    
    }else{
        return res.status(403).json("You can update only your account!");
    }

};
exports.deleteUser= async(req, res, next) => {
    if (req.body.userId === req.params.id ) {
        try {
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("Account has been deleted");
        } catch (err) {
          return res.status(500).json(err);
        }
      } else {
        return res.status(403).json("You can delete only your account!");
      }

}