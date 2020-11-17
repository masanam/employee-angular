module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
                first_name: String,
                last_name: String,
                age: String,
                phone: String,
                email: String,
                title: String,
                published: Boolean
            },
            { timestamps: true }
        );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("employee", schema);
};