using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace MyFirstBP.Localization
{
    public static class MyFirstBPLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(MyFirstBPConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(MyFirstBPLocalizationConfigurer).GetAssembly(),
                        "MyFirstBP.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
