const Site = require('../models/site');

exports.createSite = async objSite => {
	const { adresse, ville, region, code_postal } = objSite;
	const site = new Site({
		adresse,
		ville,
		region,
		code_postal,
	});
	return await site.save();
};

exports.getSites = async () => {
	return await Site.find();
};

exports.getSiteById = async id => {
	return await Site.findById(id);
};

exports.updateSite = async (id, newSiteInfo) => {
	const { adresse, ville, region, code_postal } = newSiteInfo;
	const site = await Site.findById(id);
	if (!site) {
		return Promise.reject({ message: 'Site non trouvee' });
	}
	return await Site.findOneAndUpdate(
		{ _id: id },
		{ adresse, ville, region, code_postal },
		{ new: true },
	);
};

exports.deleteSite = async id => {
	const Site = await Site.findById(id);
	if (!Site) {
		return Promise.reject({ message: 'Site non trouvee' });
	}

	await Site.deleteOne({ _id: id });
};
