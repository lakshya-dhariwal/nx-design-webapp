import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { tv } from "tailwind-variants";
import { IoDiscSharp } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import Line from "@/components/Atoms/Misc/Line";

type ShopType = "shopify" | "shopware5" | "shopware6";

interface BaseShop {
  name: string;
  isActive: boolean;
  type: ShopType;
  uid: string;
  [key: string]: any;
}

interface SubShop extends BaseShop {}

interface Shop extends BaseShop {
  subShops?: SubShop[];
}

interface ShopPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  shopList: Shop[];
  onChange: (value: Shop, event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  maxHeight?: string;
  activeShop?: Shop;
  extraElements?: React.ReactNode[];
}

const ShopLogo = ({ type }: { type: ShopType }) => (
  <img
    src={`/assets/${type}.svg`}
    alt={`${type.charAt(0).toUpperCase() + type.slice(1)} Logo`}
    className="w-6 h-6"
  />
);

const StatusIndicator = ({ isActive }: { isActive: boolean }) => (
  <IoDiscSharp
    size={8}
    className={isActive ? "text-success-500" : "text-error-500"}
  />
);

const ShopItem: React.FC<{
  shop: Shop;
  onSelect: (
    shop: Shop | SubShop,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  isSubShop?: boolean;
  searchTerm: string;
  isOpen: boolean;
  onToggle: () => void;
}> = React.memo(
  ({ shop, onSelect, isSubShop = false, searchTerm, isOpen, onToggle }) => {
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        shop.subShops?.length ? onToggle() : onSelect(shop, event);
      },
      [shop, onSelect, onToggle],
    );

    const matchesSearch = (item: BaseShop) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (
      searchTerm &&
      !matchesSearch(shop) &&
      !shop.subShops?.some(matchesSearch)
    ) {
      return null;
    }

    return (
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <motion.button
          type="button"
          className={`w-full overflow-hidden text-ellipsis rounded text-left p-2 text-sm bg-white bg-opacity-10 text-white transition-all ease-in-out duration-200 flex items-center justify-between ${
            isSubShop ? "pl-8" : ""
          }`}
          onClick={handleClick}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-2">
            <ShopLogo type={shop.type} />
            {shop.name && shop.name != ""
              ? shop.name
              : shop?.uid + " [UNNAMED]"}
          </div>
          <div className="flex items-center gap-2">
            <StatusIndicator isActive={shop.isActive} />
            {shop.subShops && shop.subShops?.length > 0 && (
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRightIcon />
              </motion.div>
            )}
          </div>
        </motion.button>

        <AnimatePresence initial={false}>
          {(isOpen || (searchTerm && shop.subShops?.some(matchesSearch))) &&
            shop.subShops && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pl-7 flex flex-col gap-1 overflow-hidden mt-2"
              >
                {shop.subShops
                  .filter((subShop) => !searchTerm || matchesSearch(subShop))
                  .map((subShop, index) => (
                    <motion.button
                      key={index + subShop.name}
                      className="overflow-hidden text-ellipsis rounded text-left p-2 text-sm bg-white bg-opacity-10 text-white hover:bg-white/10 transition-all ease-in-out duration-200 flex items-center justify-between gap-2"
                      onClick={(e) => onSelect(subShop, e)}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="flex items-center gap-2 w-full text-nowrap text-ellipsis overflow-hidden">
                        <ShopLogo type={subShop.type} />
                        {subShop.name && subShop.name != ""
                          ? subShop.name
                          : subShop?.uid + " [UNNAMED]"}
                      </div>
                      <StatusIndicator isActive={subShop.isActive} />
                    </motion.button>
                  ))}
              </motion.div>
            )}
        </AnimatePresence>
      </motion.div>
    );
  },
);

const ShopPicker: React.FC<ShopPickerProps> = React.memo(
  ({ shopList, onChange, className, activeShop, extraElements }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [openShops, setOpenShops] = useState<Set<string>>(new Set());
    const shopPickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (!shopPickerRef.current?.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const matchingShops = useMemo(() => {
      if (!searchTerm) return new Set<string>();
      const term = searchTerm.toLowerCase();
      return new Set(
        shopList
          .filter(
            (shop) =>
              shop.name.toLowerCase().includes(term) ||
              shop.subShops?.some((subShop) =>
                subShop.name.toLowerCase().includes(term),
              ),
          )
          .map((shop) => shop.name),
      );
    }, [shopList, searchTerm]);

    const handleSearchChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTerm = e.target.value;
        setSearchTerm(newTerm);
        setOpenShops(newTerm ? matchingShops : new Set());
      },
      [matchingShops],
    );

    const handleSelect = useCallback(
      (
        selectedShop: Shop | SubShop,
        event: React.MouseEvent<HTMLButtonElement>,
      ) => {
        onChange(selectedShop, event);
        setIsOpen(false);
        setSearchTerm("");
        setOpenShops(new Set());
      },
      [onChange],
    );

    const toggleShop = useCallback((shopName: string) => {
      setOpenShops((prev) => {
        const newSet = new Set(prev);
        prev.has(shopName) ? newSet.delete(shopName) : newSet.add(shopName);
        return newSet;
      });
    }, []);

    return (
      <div className={className + " relative"} ref={shopPickerRef}>
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={tv({
            base: "bg-white w-full bg-opacity-10 transition-all ease-in-out duration-300 text-white flex items-center justify-between body-3 rounded-xl p-3 gap-6",
          })()}
          whileTap={{ scale: 0.98 }}
        >
          {activeShop && (
            <>
              <div className="flex items-center gap-2 w-full text-ellipsis overflow-hidden">
                <ShopLogo type={activeShop.type} />
                {activeShop.name && activeShop.name != ""
                  ? activeShop.name
                  : activeShop?.uid + " [UNNAMED]"}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <StatusIndicator isActive={activeShop.isActive} />
                  <span
                    className={activeShop.isActive ? "text-success-500" : ""}
                  >
                    {activeShop.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <ChevronDownIcon
                  className={`transform transition-all duration-300 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`}
                />
              </div>
            </>
          )}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={tv({
                base: "top-full right-0 mt-2 py-4 absolute rounded-md shadow-lg bg-tooltip bg-opacity-40 backdrop-blur-3xl z-[2000] w-full min-h-[30vh] max-h-[50vh] overflow-y-auto",
              })()}
            >
              <div className="px-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search shops..."
                    className="w-full bg-white bg-opacity-10 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <Line className="w-full h-[2px] bg-white bg-opacity-30 my-4" />
              <>
                {extraElements &&
                  extraElements.map((element, index) => (
                    <div key={index} className="px-4">
                      {element}
                    </div>
                  ))}
              </>
              <motion.div className="px-4 space-y-2" role="menu">
                <AnimatePresence initial={false}>
                  {shopList.map((shop, index) => (
                    <ShopItem
                      key={shop.name + index}
                      shop={shop}
                      onSelect={handleSelect}
                      searchTerm={searchTerm}
                      isOpen={openShops.has(shop.name)}
                      onToggle={() => toggleShop(shop.name)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

export default ShopPicker;
