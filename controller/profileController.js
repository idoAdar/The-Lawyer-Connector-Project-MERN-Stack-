const { body, validationResult } = require('express-validator');
const { profile_url } = require('gravatar');
const Profile = require('../models/Profile');

exports.getProfile = async (req, res, next) => {
    try {   // NOTICE: For Populate the ref in the schema must be the exec name as the Schema we refrencing for => 'User'
            // Also, the populate('') should refrece to the name of the field that has ref => 'user'
        const userProfile = await Profile.findOne({ user: req.user.id }).populate('user');
        if (!userProfile) {
            return res.status(400).json({ msg: 'This user has no profile' });
        }
        return res.json(userProfile);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: 'Server error' });
    }
}

exports.postProfile = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        company,
        websites,
        location,
        status,
        skills,
        bio,
        githunusername,
        youtube,
        twitter,
        facebook,
        linkedin,
        instegram,
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (websites) profileFields.websites = websites;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (skills) profileFields.skills = skills;

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instegram) profileFields.social.instegram = instegram;

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields });
            return res.json(profile);
        }
        const newProfile = await new Profile(profileFields);
        await newProfile.save();
        return res.json(newProfile);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server Error' });
    }
}

exports.getAllProfiles = async (req, res, next) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        return res.json(profiles);
    } catch (err) {
        res.status(400).json({ msg: 'Server Error' });
    }
}

exports.getProfileUserById = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const profile = await Profile.findOne({ user: userId }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'User not found' });
        }
        return res.json(profile);
    } catch (err) {
        return res.status(400).json({ msg: 'Server Error' });
    }
}

exports.updateExperience = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const userExperience = {
        title: title,
        company: company,
        location: location,
        from: from,
        to: to,
        current: current,
        description: description
    }

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(userExperience);
        await profile.save();
        return res.json(profile);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: 'Server Error' });
    }
}

exports.deleteExperience = async (req, res, next) => {
    const params = req.params.experienceId;
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const updateExperience = profile.experience.filter(ex => ex._id.toString() !== params.toString());
        profile.experience = updateExperience;
        await profile.save();
        return res.json(profile);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: 'Server Error' });
    }
}

exports.updateEducation = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        school,
        degree,
        from,
        to,
        current,
        description
    } = req.body;

    const userEducation = {
        school,
        degree,
        from,
        to,
        current,
        description
    };

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(userEducation);
        await profile.save();
        return res.json(profile);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: 'Server Error' });
    }
}

exports.deleteEducation = async (req, res, next) => {
    console.log('updateEducation');
    const params = req.params.educationId;
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        const updateEducation = profile.education.filter(ed => ed._id.toString() !== params.toString());
        profile.education = updateEducation;
        await profile.save();
        return res.json(profile);
    } catch (err) {
        console.errors(err);
        return res.status(400).json({ msg: 'Server Error' });
    }
}